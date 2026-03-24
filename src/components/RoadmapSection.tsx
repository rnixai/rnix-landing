import { useInView } from '../hooks/useInView';
import {
  Cpu,
  FolderTree,
  Search,
  FileCode2,
  MessageSquare,
  Layers,
  ShieldCheck,
  Activity,
  TerminalSquare,
  Package,
  Plug,
  RotateCcw,
  GitBranch,
  Brain,
  Monitor,
  Coins,
  Fingerprint,
  Timer,
  Database,
} from 'lucide-react';

const CAPABILITIES = [
  { icon: Cpu, title: 'Process Model', items: ['spawn / kill / wait / signal', 'UUID v7 cross-session identity', 'Process trees + zombie reaping'] },
  { icon: FolderTree, title: 'Virtual Filesystem', items: ['/proc/ dynamic agent state', '/dev/ device routing (incl. OpenAI compat)', '/mnt/mcp/ service mounts'] },
  { icon: Search, title: 'strace Debugging', items: ['Real-time syscall tracing', 'Params, returns, timing', 'Pinpoint bugs in minutes'] },
  { icon: FileCode2, title: 'Skills Ecosystem', items: ['Agent Skills open standard', 'SKILL.md progressive loading', 'rnix skill install / search / update'] },
  { icon: MessageSquare, title: 'IPC Communication', items: ['Send / Recv / Pipe syscalls', 'Process groups + broadcast', 'Unix-style pipe composition'] },
  { icon: Layers, title: 'Compose Orchestration', items: ['Declarative YAML workflows', 'DAG dependency scheduling', 'rnix compose up / down'] },
  { icon: GitBranch, title: 'Intent System', items: ['Declarative intent decomposition', 'rnix intent apply / status / list', 'Reconciler drives intent tree'] },
  { icon: Brain, title: 'Autonomous Agents', items: ['Unified reasoning loop (7 action types)', 'Planning config (planning: true/false)', 'Stem cell differentiation'] },
  { icon: Plug, title: 'MCP Integration', items: ['Mount external services', 'VFS path access to tools', '4-layer capability stack'] },
  { icon: RotateCcw, title: 'Supervisor Trees', items: ['one_for_one / one_for_all / rest_for_one', 'Automatic crash recovery', 'Init bootstrap sequence'] },
  { icon: Activity, title: 'Live Monitoring', items: ['rnix top real-time TUI', 'rnix log [think]/[tool]/[output]', 'Token budget management'] },
  { icon: TerminalSquare, title: 'AgentShell', items: ['Pipe: rnix -i \'spawn "A" | spawn "B"\'', 'Variables + environment passing', 'if-else + on-error control'] },
  { icon: Monitor, title: 'Visual Dashboard', items: ['Multi-pane TUI (tree, timeline, heatmap)', '3 view modes (default/expanded/fullscreen)', 'History view + LLM conversation viewer'] },
  { icon: Timer, title: 'Step Recording', items: ['Full execution history per process', 'NDJSON persistence (.rnix/data/steps/)', 'IPC: get_step_detail / list_steps'] },
  { icon: Database, title: 'Token Economy', items: ['Budget pools + priority allocation', 'Contract SLAs + auto-evaluation', 'Agent reputation + synergy matrix'] },
  { icon: ShieldCheck, title: 'Adaptive Immune', items: ['Behavioral anomaly detection', 'Threat signature memory', 'Configurable (disabled by default)'] },
  { icon: Coins, title: '20+ LLM Providers', items: ['Claude CLI / Cursor CLI / OpenAI Compat', 'OpenAI / Gemini / Groq / DeepSeek / Mistral / Ollama', 'Provider fallback + health checks + OpenAI gateway'] },
  { icon: Package, title: '50+ Syscalls', items: ['Stable, versioned ABI', 'Process + Context + VFS + IPC + Signal', 'Automatic SyscallEvent tracing'] },
];

export default function RoadmapSection() {
  const { ref, isInView } = useInView(0.08);

  return (
    <section className="py-40 px-6" id="roadmap">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="max-w-2xl mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            A complete OS, not a partial prototype
          </h2>
          <p className="text-on-surface-variant text-lg">
            Rnix launches with the full capability stack: microkernel, VFS, IPC,
            compose orchestration, intent system, autonomous agents,
            skill ecosystem, dashboard, token economy, immune security, and monitoring.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="bg-surface-container p-6 group transition-colors hover:bg-surface-bright"
                style={{ animationDelay: `${i * 60}ms`, border: '1px solid rgba(59, 75, 55, 0.2)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-secondary-container flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white font-headline">{cap.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li key={item} className="text-xs text-on-surface-variant leading-relaxed flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-secondary-container/60 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <p className="text-sm text-gray-500">
            Built with Go.{' '}
            <span className="text-on-surface">goroutine = agent process, channel = IPC, interface = syscall contract.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
