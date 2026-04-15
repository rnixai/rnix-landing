import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { withUtm } from '../utils/utm';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'highlight' | 'error' | 'dim' | 'success';
  delay: number;
}

const STRACE_LINES: TerminalLine[] = [
  { text: '$ rnix -i "Analyze code quality" --agent=code-analyst', type: 'command', delay: 0 },
  { text: '[kernel] spawning PID 1 (claude/haiku)...', type: 'dim', delay: 800 },
  { text: '[agent/1] reasoning step 1...', type: 'output', delay: 500 },
  { text: '[agent/1] reasoning step 2...', type: 'output', delay: 400 },
  { text: '', type: 'dim', delay: 300 },
  { text: '── strace (Terminal B) ──────────────────────────────', type: 'dim', delay: 200 },
  { text: '$ rnix strace 1', type: 'command', delay: 600 },
  { text: '[strace] attached to PID 1 (state: running)', type: 'dim', delay: 400 },
  { text: '[  0.013s] Open(path="/dev/llm/claude") → 3', type: 'output', delay: 250 },
  { text: '[  0.014s] Write(fd=3, size=1234) → <nil>    5.20s  ← LLM call', type: 'output', delay: 200 },
  { text: '[  5.214s] Read(fd=3, length=65536) → 892B', type: 'output', delay: 200 },
  { text: '[  5.216s] Open(path="/dev/fs/./cmd/main.go") → 4', type: 'output', delay: 200 },
  { text: '[  5.217s] Read(fd=4, length=65536) → 2048', type: 'output', delay: 200 },
  { text: '', type: 'dim', delay: 300 },
  { text: '══ Result ═══════════════════════════════════════════', type: 'success', delay: 500 },
  { text: '  Code Quality: Good. Consistent error handling.', type: 'success', delay: 200 },
  { text: '  1 warning: unused import in parser.go:42', type: 'highlight', delay: 100 },
  { text: '══════════════════════════════════════════════════════', type: 'success', delay: 200 },
  { text: '[kernel] PID 1 exited(0) | claude/haiku | tokens: 1,234 | elapsed: 6.2s', type: 'dim', delay: 400 },
];

const COMPOSE_LINES: TerminalLine[] = [
  { text: '$ rnix compose up', type: 'command', delay: 0 },
  { text: '[compose] reading compose.yaml...', type: 'dim', delay: 500 },
  { text: '[compose] spawning analyzer (code-analyst)...', type: 'output', delay: 600 },
  { text: '[compose] spawning docs (tech-writer) [depends_on: analyzer]...', type: 'output', delay: 400 },
  { text: '', type: 'dim', delay: 200 },
  { text: 'PID  STATE      AGENT      DEPENDS_ON', type: 'highlight', delay: 300 },
  { text: ' 1   Running    analyzer   -', type: 'output', delay: 200 },
  { text: ' 2   Pending    docs       analyzer', type: 'dim', delay: 300 },
  { text: '', type: 'dim', delay: 400 },
  { text: '[kernel] PID 1 exited(0)', type: 'success', delay: 500 },
  { text: '[compose] dependency met, spawning docs...', type: 'output', delay: 400 },
  { text: ' 2   Running    docs       analyzer ✓', type: 'output', delay: 300 },
  { text: '[kernel] PID 2 exited(0)', type: 'success', delay: 500 },
  { text: '', type: 'dim', delay: 200 },
  { text: '✓ compose complete — 2/2 agents exited(0)', type: 'success', delay: 400 },
];

const DASHBOARD_LINES: TerminalLine[] = [
  { text: '$ rnix dashboard', type: 'command', delay: 0 },
  { text: '[dashboard] connecting to daemon...', type: 'dim', delay: 600 },
  { text: '[dashboard] loading 4 active processes', type: 'dim', delay: 400 },
  { text: '', type: 'dim', delay: 300 },
  { text: '╭─ Rnix Dashboard ─ [1]Tree [2]Time [3]Heat [4]Detail [5]Intent ──╮', type: 'highlight', delay: 200 },
  { text: '│                     │                                            │', type: 'output', delay: 100 },
  { text: '│  AGENT TREE        │  TIMELINE                                    │', type: 'output', delay: 100 },
  { text: '│  ▸ ● 1 orchestratr │  10:31:02 ● PID 1 spawn(coder)              │', type: 'output', delay: 150 },
  { text: '│    ├─ ● 2 coder    │  10:31:05 ■ PID 2 write(1024 tok)  ← LLM   │', type: 'output', delay: 150 },
  { text: '│    ├─ ● 3 reviewer │  10:31:08 ◆ PID 3 open(/dev/shell)          │', type: 'output', delay: 150 },
  { text: '│    └─ ✓ 4 research │  10:31:10 ✕ PID 4 exit(0)                   │', type: 'dim', delay: 150 },
  { text: '│                     │                                            │', type: 'output', delay: 100 },
  { text: '│                     │  FOCUS: PID 2 coder ━━ Running 2m30s        │', type: 'highlight', delay: 200 },
  { text: '│                     │  ┌─ Tokens ──────┐ ┌─ Context ────┐        │', type: 'output', delay: 150 },
  { text: '│                     │  │ ██████▓░ 1.2k  │ │ Sys  ██░ 15% │        │', type: 'output', delay: 150 },
  { text: '│                     │  │ rate: 12 tok/s │ │ User ████ 30%│        │', type: 'output', delay: 150 },
  { text: '│                     │  │ steps: 5       │ │ Asst ████ 45%│        │', type: 'output', delay: 150 },
  { text: '│                     │  └───────────────┘ └──────────────┘        │', type: 'output', delay: 150 },
  { text: '╰─ 4 procs (3● 1✓) │ 2.9k tok ── 1-8:jump L:llm d:debug ─────────╯', type: 'dim', delay: 300 },
  { text: '', type: 'dim', delay: 200 },
  { text: '┌─ [press 1] Tree expanded — all processes unified ────────────────┐', type: 'highlight', delay: 600 },
  { text: '│ PID  ST  AGENT          MODEL           TOKENS   ELAPSED  EXIT  │', type: 'output', delay: 150 },
  { text: '│ ▸ 1  ●   orchestrator   claude-sonnet     820    5m12s     -   │', type: 'output', delay: 150 },
  { text: '│ ├ 2  ●   coder          claude-sonnet   1,204    2m30s     -   │', type: 'output', delay: 150 },
  { text: '│ ├ 3  ●   reviewer       claude-haiku      312    1m05s     -   │', type: 'output', delay: 150 },
  { text: '│ └ 4  ✓   researcher     claude-haiku      580    0m58s     0   │', type: 'dim', delay: 150 },
  { text: '│ ● Running: 3 │ ✓ Done: 1 │ ✕ Failed: 0 │ Total: 2,916 tok     │', type: 'success', delay: 200 },
  { text: '└─────────────────────────────────────────────────────────────────┘', type: 'highlight', delay: 200 },
  { text: '', type: 'dim', delay: 200 },
  { text: '┌─ [press L] LLM Viewer — full request/response per step ─────────┐', type: 'highlight', delay: 600 },
  { text: '│ ┌─ REQUEST → claude-sonnet ───────────────── 1,024 tok ───────┐ │', type: 'output', delay: 150 },
  { text: '│ │ [system] You are a coder agent...                          │ │', type: 'output', delay: 150 },
  { text: '│ │ [user] Implement POST /api/users                           │ │', type: 'output', delay: 150 },
  { text: '│ └────────────────────────────────────────────────────────────┘ │', type: 'output', delay: 150 },
  { text: '│ ┌─ RESPONSE ← claude-sonnet ───── 512 tok │ latency: 2.8s ───┐ │', type: 'success', delay: 200 },
  { text: '│ │ [assistant] I\'ll create the handler...                    │ │', type: 'output', delay: 150 },
  { text: '│ │ [tool_call] write_file → src/handlers/user.go             │ │', type: 'output', delay: 150 },
  { text: '│ └────────────────────────────────────────────────────────────┘ │', type: 'success', delay: 150 },
  { text: '│ ◀ Step 2 │ Step 3* │ Step 4 ▶  j/k:scroll  h/l:step  Esc:close│', type: 'dim', delay: 200 },
  { text: '└─────────────────────────────────────────────────────────────────┘', type: 'highlight', delay: 200 },
  { text: '', type: 'dim', delay: 200 },
  { text: '┌─ [press d] Debug Mode — strace + context profiling ───────────┐', type: 'highlight', delay: 600 },
  { text: '│ STRACE (PID 2 coder)              │ CONTEXT PROFILE        │', type: 'output', delay: 150 },
  { text: '│ [0.013s] Open(/dev/llm/claude) →3 │ ████ System    15%     │', type: 'output', delay: 150 },
  { text: '│ [0.014s] Write(fd=3) → 5.20s  LLM │ ███  Skill     12%     │', type: 'output', delay: 150 },
  { text: '│ [5.214s] Read(fd=3) → 892B        │ ████ Dialog    28%     │', type: 'output', delay: 150 },
  { text: '│ [5.216s] Open(/dev/fs/main.go) →4 │ █████ Tool res  35%     │', type: 'dim', delay: 150 },
  { text: '│ [5.217s] Read(fd=4) → 2048B       │ ██ Leaked      10%     │', type: 'error', delay: 150 },
  { text: '│ Avg: /dev/llm 5.2s  /dev/fs 1ms   │ Budget: 6.2k / 8k tok │', type: 'success', delay: 200 },
  { text: '└─────────────────────────────────────────────────────────────┘', type: 'highlight', delay: 200 },
  { text: '', type: 'dim', delay: 300 },
  { text: '● Running  ○ Created  ✓ Done  ✕ Failed  ⏸ Paused', type: 'dim', delay: 200 },
  { text: '8 views. 1-8 to jump. No tab cycling. Full process history.', type: 'success', delay: 400 },
];

export default function Hero() {
  const [straceProgress, setStraceProgress] = useState(0);
  const [composeProgress, setComposeProgress] = useState(0);
  const [dashboardProgress, setDashboardProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'strace' | 'compose' | 'dashboard'>('strace');
  const [isStraceRunning, setIsStraceRunning] = useState(false);
  const [isComposeRunning, setIsComposeRunning] = useState(false);
  const [isDashboardRunning, setIsDashboardRunning] = useState(false);
  const straceTimersRef = useRef<number[]>([]);
  const composeTimersRef = useRef<number[]>([]);
  const dashboardTimersRef = useRef<number[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const runSequence = useCallback((
    lines: TerminalLine[],
    setProgress: (n: number) => void,
    setIsRunning: (b: boolean) => void,
    timersRef: React.MutableRefObject<number[]>,
    startDelay: number
  ) => {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];
    setProgress(0);
    setIsRunning(true);

    let totalDelay = startDelay;
    lines.forEach((line, i) => {
      totalDelay += line.delay;
      const id = setTimeout(() => {
        setProgress(i + 1);
        if (i === lines.length - 1) setIsRunning(false);
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, totalDelay) as unknown as number;
      timersRef.current.push(id);
    });
  }, []);

  const runAll = useCallback(() => {
    runSequence(STRACE_LINES, setStraceProgress, setIsStraceRunning, straceTimersRef, 0);
    runSequence(COMPOSE_LINES, setComposeProgress, setIsComposeRunning, composeTimersRef, 500);
    runSequence(DASHBOARD_LINES, setDashboardProgress, setIsDashboardRunning, dashboardTimersRef, 1000);
  }, [runSequence]);

  useEffect(() => {
    const timer = setTimeout(runAll, 1200);
    return () => {
      clearTimeout(timer);
      straceTimersRef.current.forEach(id => clearTimeout(id));
      composeTimersRef.current.forEach(id => clearTimeout(id));
      dashboardTimersRef.current.forEach(id => clearTimeout(id));
    };
  }, [runAll]);

  const isRunning = isStraceRunning || isComposeRunning || isDashboardRunning;

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-primary-container';
      case 'output': return 'text-on-surface';
      case 'highlight': return 'text-secondary-container font-medium';
      case 'error': return 'text-error';
      case 'success': return 'text-primary-container font-semibold';
      case 'dim': return 'text-gray-500';
    }
  };

  const currentLines = activeTab === 'strace' ? STRACE_LINES : activeTab === 'compose' ? COMPOSE_LINES : DASHBOARD_LINES;
  const currentProgress = activeTab === 'strace' ? straceProgress : activeTab === 'compose' ? composeProgress : dashboardProgress;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40"></div>
      <div className="absolute inset-0 hero-gradient"></div>

      <div className="z-10 max-w-6xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface-container/50 border text-[11px] font-mono text-primary-fixed mb-12 tracking-[0.3em] uppercase backdrop-blur-sm" style={{ borderColor: 'rgba(59, 75, 55, 0.3)' }}>
          <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse shadow-[0_0_10px_#00ff41]"></span>
          Built with Go from scratch
        </div>

        <h1 className="font-headline text-7xl md:text-[10rem] font-bold tracking-tighter mb-8 leading-none">
        The AI-Era <span className="text-primary-container">Unix</span>
        </h1>

        <p className="max-w-3xl mx-auto text-on-surface-variant text-xl md:text-2xl mb-16 font-body leading-relaxed opacity-80">
          Power AI agents with Unix philosophy — processes, filesystems, syscalls,
          debugging, and autonomous reasoning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#get-started" className="btn-primary-lg">
            GET STARTED
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href={withUtm('https://github.com/rnixai/rnix', 'github_hero', 'cta')} target="_blank" rel="noopener noreferrer" className="btn-secondary-lg">
            <Github className="w-5 h-5" />
            GITHUB
          </a>
        </div>
      </div>

      {/* Terminal Demo */}
      <div className="mt-24 w-full max-w-5xl relative">
        <div className="bg-surface-container-lowest overflow-hidden relative terminal-glow" style={{ border: '1px solid rgba(59, 75, 55, 0.3)' }}>
          {/* Title bar with tabs */}
          <div className="flex items-center gap-2 px-4 py-0 bg-surface-container" style={{ borderBottom: '1px solid rgba(59, 75, 55, 0.2)' }}>
            <div className="flex gap-1.5 py-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255, 183, 125, 0.8)' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255, 183, 125, 0.8)' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0, 255, 65, 0.8)' }} />
            </div>

            <div className="flex gap-0 ml-2">
              <button
                onClick={() => setActiveTab('strace')}
                className={`px-3 py-2 text-[11px] font-mono tracking-wider transition-colors border-b-2 ${
                  activeTab === 'strace'
                    ? 'text-primary-container border-primary-container'
                    : 'text-gray-500 border-transparent hover:text-on-surface'
                }`}
              >
                strace
              </button>
              <button
                onClick={() => setActiveTab('compose')}
                className={`px-3 py-2 text-[11px] font-mono tracking-wider transition-colors border-b-2 ${
                  activeTab === 'compose'
                    ? 'text-secondary-container border-secondary-container'
                    : 'text-gray-500 border-transparent hover:text-on-surface'
                }`}
              >
                compose
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 text-[11px] font-mono tracking-wider transition-colors border-b-2 ${
                  activeTab === 'dashboard'
                    ? 'text-secondary-container border-secondary-container'
                    : 'text-gray-500 border-transparent hover:text-on-surface'
                }`}
              >
                dashboard
              </button>
            </div>

            <div className="ml-auto">
              {!isRunning && straceProgress >= STRACE_LINES.length && composeProgress >= COMPOSE_LINES.length && dashboardProgress >= DASHBOARD_LINES.length && (
                <button onClick={runAll} className="px-3 py-2 text-[11px] font-mono text-gray-500 hover:text-primary-container transition-colors">
                  ↻ replay
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div ref={terminalRef} aria-live="polite" className="p-4 sm:p-6 font-mono text-[10px] sm:text-[13px] leading-5 sm:leading-6 min-h-[300px] sm:min-h-[480px] overflow-y-auto text-left">
            {currentLines.slice(0, currentProgress).map((line, i) => (
              <div key={`${activeTab}-${i}`} className={`${getLineColor(line.type)} animate-fade-in whitespace-pre`}>
                {line.text || '\u00A0'}
              </div>
            ))}
            {((activeTab === 'strace' && isStraceRunning) || (activeTab === 'compose' && isComposeRunning) || (activeTab === 'dashboard' && isDashboardRunning)) && (
              <span className="inline-block w-2 h-4 bg-primary-container animate-terminal-blink" />
            )}
          </div>

          {/* Orchestration overlay - only for compose tab */}
          {activeTab === 'compose' && composeProgress > 2 && (
            <div className="absolute bottom-6 right-6 flex gap-3 items-center animate-fade-in">
              <div className="w-28 h-20 rounded p-2 text-left" style={{ border: '1px solid rgba(0, 255, 65, 0.3)', backgroundColor: 'rgba(0, 255, 65, 0.05)' }}>
                <div className="text-[9px] text-primary-container uppercase mb-1 font-mono">PID 1</div>
                <div className="text-[9px] text-gray-500">analyzer</div>
                <div className="h-1 rounded mt-2" style={{ backgroundColor: 'rgba(0, 255, 65, 0.4)', width: '75%' }} />
              </div>
              <div className="flex items-center text-gray-600 text-lg">→</div>
              <div className="w-28 h-20 rounded p-2 text-left" style={{ border: '1px solid rgba(20, 209, 255, 0.3)', backgroundColor: 'rgba(20, 209, 255, 0.05)' }}>
                <div className="text-[9px] text-secondary-container uppercase mb-1 font-mono">PID 2</div>
                <div className="text-[9px] text-gray-500">docs</div>
                <div className="h-1 rounded mt-2" style={{ backgroundColor: 'rgba(20, 209, 255, 0.4)', width: '50%' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
