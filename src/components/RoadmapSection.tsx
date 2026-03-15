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
} from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Cpu,
    title: 'Process Model',
    items: ['spawn / kill / wait / signal', 'Full lifecycle state machine', 'Process trees + zombie reaping'],
  },
  {
    icon: FolderTree,
    title: 'Virtual Filesystem',
    items: ['/proc/ dynamic agent state', '/dev/ device routing', '/mnt/mcp/ service mounts'],
  },
  {
    icon: Search,
    title: 'strace Debugging',
    items: ['Real-time syscall tracing', 'Params, returns, timing', 'Pinpoint bugs in minutes'],
  },
  {
    icon: FileCode2,
    title: 'Skills Ecosystem',
    items: ['Agent Skills open standard', 'SKILL.md progressive loading', 'skill install / search / update'],
  },
  {
    icon: MessageSquare,
    title: 'IPC Communication',
    items: ['Send / Recv / Pipe syscalls', 'Process groups + broadcast', 'Unix-style pipe composition'],
  },
  {
    icon: Layers,
    title: 'Compose Orchestration',
    items: ['Declarative YAML workflows', 'DAG dependency scheduling', 'compose up / compose down'],
  },
  {
    icon: Plug,
    title: 'MCP Integration',
    items: ['Mount external services', 'VFS path access to tools', '4-layer capability stack'],
  },
  {
    icon: RotateCcw,
    title: 'Supervisor Trees',
    items: ['one_for_one / all / rest_for_one', 'Automatic crash recovery', 'Init bootstrap sequence'],
  },
  {
    icon: Activity,
    title: 'Live Monitoring',
    items: ['rnix top real-time TUI', 'rnix log structured output', 'Token budget management'],
  },
  {
    icon: TerminalSquare,
    title: 'AgentShell',
    items: ['Pipe syntax: spawn A | spawn B', 'Variables + environment passing', 'if-else + on-error control'],
  },
  {
    icon: Package,
    title: '45 Syscalls',
    items: ['Stable, versioned ABI', 'Process + Context + VFS + IPC', 'Signal + Timer + Capability'],
  },
  {
    icon: ShieldCheck,
    title: 'Security Model',
    items: ['Skill-based permission whitelist', 'Capability grant / revoke / check', 'Device access control'],
  },
];

export default function RoadmapSection() {
  const { ref, isInView } = useInView(0.08);

  return (
    <section className="py-16 lg:py-24 section-padding bg-midnight-950/50" id="roadmap">
      <div className="section-container" ref={ref}>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            A complete OS, not a partial prototype
          </h2>
          <p className="text-midnight-400 text-lg">
            Rnix launches with the full capability stack: microkernel, VFS, IPC,
            compose orchestration, skill ecosystem, supervisor trees, and monitoring.
          </p>
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="border border-midnight-800/50 rounded-xl bg-midnight-900/20 p-5 group transition-colors hover:border-midnight-700/60"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {cap.items.map((item) => (
                    <li key={item} className="text-xs text-midnight-400 leading-relaxed flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan-600/60 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <p className="text-sm text-midnight-500">
            Built with Go.{' '}
            <span className="text-midnight-300">goroutine = agent process, channel = IPC, interface = syscall contract.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
