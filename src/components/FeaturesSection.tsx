import { useInView } from '../hooks/useInView';
import {
  Search,
  Cpu,
  FolderTree,
  FileCode2,
  Layers,
  Zap,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'strace for AI Agents',
    description:
      'Trace every syscall an agent makes. See exactly what it read, what it wrote, where it went wrong — with nanosecond precision.',
    code: `rnix strace 1\n[0.04s] Open("/dev/fs/.../logout.go") → 5\n        ^^^ WRONG FILE`,
    tag: 'Killer Feature',
    tagColor: 'text-primary bg-primary/10',
  },
  {
    icon: Cpu,
    title: 'Agents as Processes',
    description:
      'spawn / kill / wait / signal — full process lifecycle semantics. Process trees, state machines, zombie reaping. Real OS primitives, not simulations.',
    code: `rnix ps\n\nPID  STATE   AGENT   TOKENS\n 1   Running  analyst  1,204\n 2   Zombie   review  3,891`,
    tag: 'Core',
    tagColor: 'text-secondary bg-secondary/10',
  },
  {
    icon: FolderTree,
    title: 'Everything is a File',
    description:
      'Tools → /dev/ devices. MCP → /mnt/ mounts. Agent state → /proc/ files. One unified interface replaces fragmented tool/service/state abstractions.',
    code: `/proc/{pid}/status\n/dev/llm/claude\n/dev/fs\n/dev/shell`,
    tag: 'VFS',
    tagColor: 'text-secondary bg-secondary/10',
  },
  {
    icon: FileCode2,
    title: 'Skills as Packages',
    description:
      'SKILL.md follows the Agent Skills open standard (agentskills.io). Write once, share everywhere — compatible with 30+ AI tools in the ecosystem.',
    code: `---\nname: code-analysis\nallowed-tools: /dev/fs /dev/shell\n---\n## Steps\n1. Read target file...`,
    tag: 'Ecosystem',
    tagColor: 'text-tertiary bg-tertiary/10',
  },
  {
    icon: Layers,
    title: '4-Layer Capability Model',
    description:
      'Process (runtime) → Agent (identity) → Skill (how-to) → VFS Device. Each layer has clear responsibilities. Skills define allowed-tools; agents aggregate permissions.',
    code: `Process: PID 1\n  └─ Agent: code-analyst\n      └─ Skill: code-analysis\n          allowed-tools: /dev/fs /dev/shell\n      └─ VFS: /dev/llm /dev/fs /dev/shell`,
    tag: 'Architecture',
    tagColor: 'text-secondary bg-secondary/10',
  },
  {
    icon: Zap,
    title: '45 Syscalls. One ABI.',
    description:
      'A stable, versioned syscall interface — the "constitution" of the OS. 45 syscalls covering process management, IPC, VFS, signals, capabilities, and debugging.',
    code: `Process: Spawn Kill Wait ListProcs\nContext: CtxAlloc CtxRead CtxWrite CtxFree\nVFS: Open Read Write Close Stat\nIPC/Signal: Send Recv Pipe\nDebug: SyscallEvent auto-recorded`,
    tag: 'ABI',
    tagColor: 'text-secondary bg-secondary/10',
  },
];

export default function FeaturesSection() {
  const { ref, isInView } = useInView(0.08);

  return (
    <section className="py-20 lg:py-28 section-padding" id="features">
      <div className="section-container" ref={ref}>
        <div className="max-w-2xl mb-16">
          <h2 className="font-display text-headline-md font-bold text-white mb-4 text-balance">
            OS-level primitives for AI agents
          </h2>
          <p className="text-on_surface_variant text-lg">
            Not another wrapper. Rnix provides the foundational abstractions that frameworks
            keep trying — and failing — to build at the app layer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`glass-card-hover p-6 flex flex-col min-w-0 ${i === 0 ? 'md:col-span-2' : ''} ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span
                    className={`text-label-sm font-semibold tracking-wider uppercase px-2 py-1 ${feature.tagColor}`}
                  >
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-title-md font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-on_surface_variant text-body-md leading-relaxed mb-5 flex-1">
                  {feature.description}
                </p>

                <div className="bg-surface p-3.5 font-mono text-body-sm leading-5 text-on_surface whitespace-pre min-w-0 overflow-hidden">
                  {feature.code}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
