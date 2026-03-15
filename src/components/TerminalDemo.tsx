import { useState, useEffect, useCallback, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'highlight' | 'error' | 'dim' | 'success';
  delay: number;
}

const STRACE_DEMO: TerminalLine[] = [
  { text: '$ rnix "review this code" --agent=code-analyst', type: 'command', delay: 0 },
  { text: '[kernel] Spawning process PID=1 agent=code-analyst', type: 'dim', delay: 800 },
  { text: '[agent/1] state: Created → Running', type: 'output', delay: 400 },
  { text: '', type: 'dim', delay: 300 },
  { text: '$ rnix strace 1', type: 'command', delay: 600 },
  { text: '─── syscall trace for PID 1 ───', type: 'dim', delay: 400 },
  { text: '[0.00s] Spawn(pid=1, agent="code-analyst")       → ok', type: 'output', delay: 300 },
  { text: '[0.01s] CtxAlloc(pid=1, budget=8192)             → ctx_0x01', type: 'output', delay: 200 },
  { text: '[0.02s] Open("/dev/fs/src/auth/login.go", R)     → fd=3', type: 'output', delay: 200 },
  { text: '[0.03s] Read(fd=3, len=2048)                     → 2048 bytes', type: 'output', delay: 200 },
  { text: '[0.04s] CtxWrite(ctx_0x01, "file_content", ...)  → ok', type: 'output', delay: 200 },
  { text: '[0.12s] Open("/dev/llm/sonnet", RW)              → fd=4', type: 'output', delay: 300 },
  { text: '[0.13s] Write(fd=4, prompt, 3200 tokens)         → ok', type: 'output', delay: 200 },
  { text: '[3.41s] Read(fd=4)                               → tool_call', type: 'highlight', delay: 1200 },
  { text: '[3.42s] Open("/dev/fs/src/auth/logout.go", R)    → fd=5', type: 'error', delay: 400 },
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
      case 'command': return 'text-cyan-400';
      case 'output': return 'text-midnight-200';
      case 'highlight': return 'text-cyan-300 font-medium';
      case 'error': return 'text-red-400';
      case 'success': return 'text-emerald-400 font-semibold';
      case 'dim': return 'text-midnight-500';
    }
  };

  return (
    <div className="terminal-window">
      <div className="flex items-center gap-2 px-4 py-3 bg-midnight-900/80 border-b border-midnight-800/60">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-midnight-500 font-mono ml-2">rnix strace</span>
        <div className="flex-1" />
        {!isRunning && visibleLines >= STRACE_DEMO.length && (
          <button
            onClick={runDemo}
            className="text-xs text-midnight-500 hover:text-cyan-400 transition-colors font-mono"
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
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-terminal-blink" />
        )}
      </div>
    </div>
  );
}
