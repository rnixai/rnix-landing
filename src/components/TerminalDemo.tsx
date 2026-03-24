import { useState, useEffect, useCallback, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'highlight' | 'error' | 'dim' | 'success';
  delay: number;
}

const STRACE_DEMO: TerminalLine[] = [
  { text: '$ rnix -i "Review this code" --agent=code-analyst', type: 'command', delay: 0 },
  { text: '[kernel] spawning PID 1 (claude/haiku)...', type: 'dim', delay: 800 },
  { text: '[agent/1] reasoning step 1...', type: 'output', delay: 400 },
  { text: '', type: 'dim', delay: 300 },
  { text: '$ rnix strace 1', type: 'command', delay: 600 },
  { text: '[strace] attached to PID 1 (state: running)', type: 'dim', delay: 400 },
  { text: '[  0.013s] Open(path="/dev/llm/claude") → 3    1ms', type: 'output', delay: 300 },
  { text: '[  0.014s] Write(fd=3, size=1234) → <nil>    5.20s  ← LLM call', type: 'output', delay: 200 },
  { text: '[  5.214s] Read(fd=3, length=65536) → 892B      2ms', type: 'output', delay: 200 },
  { text: '[  5.216s] Open(path="/dev/fs/./src/auth/login.go") → 4', type: 'output', delay: 200 },
  { text: '[  5.217s] Read(fd=4, length=65536) → 2048       1ms', type: 'output', delay: 200 },
  { text: '[  5.218s] Open(path="/dev/fs/./src/auth/logout.go") → 5', type: 'error', delay: 400 },
  { text: '        ^^^ WRONG FILE — expected login.go, got logout.go', type: 'error', delay: 100 },
  { text: '', type: 'dim', delay: 400 },
  { text: '3 minutes. From 3 days to 3 minutes.', type: 'success', delay: 600 },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef<number[]>([]);

  const runDemo = useCallback(() => {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];
    setVisibleLines(0);
    setIsRunning(true);

    let totalDelay = 0;

    STRACE_DEMO.forEach((line, i) => {
      totalDelay += line.delay;
      const id = setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === STRACE_DEMO.length - 1) {
          setIsRunning(false);
        }
      }, totalDelay) as unknown as number;
      timersRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(runDemo, 1200);
    return () => {
      clearTimeout(timer);
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    };
  }, [runDemo]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-secondary';
      case 'output': return 'text-on_surface';
      case 'highlight': return 'text-secondary font-medium';
      case 'error': return 'text-tertiary';
      case 'success': return 'text-primary font-semibold';
      case 'dim': return 'text-on_surface_muted';
    }
  };

  return (
    <div className="terminal-window">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface_container">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-tertiary/80" />
          <div className="w-3 h-3 rounded-full bg-tertiary/80" />
          <div className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="text-xs text-on_surface_muted font-mono ml-2">rnix strace</span>
        <div className="flex-1" />
        {!isRunning && visibleLines >= STRACE_DEMO.length && (
          <button
            onClick={runDemo}
            className="text-xs text-on_surface_muted hover:text-secondary transition-colors font-mono min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
          >
            replay
          </button>
        )}
      </div>
      <div aria-live="polite" className="p-3 sm:p-5 font-mono text-[10px] sm:text-[13px] leading-5 sm:leading-6 min-h-[300px] sm:min-h-[420px] overflow-x-auto">
        {STRACE_DEMO.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`${getLineColor(line.type)} animate-fade-in whitespace-pre`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        {isRunning && (
          <span className="inline-block w-2 h-4 bg-secondary animate-terminal-blink" />
        )}
      </div>
    </div>
  );
}
