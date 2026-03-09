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
    code: `rnix strace 1\n\n[0.04s] Open("/dev/fs/src/auth/logout.go")\n        ^^^ WRONG FILE`,
    tag: 'Killer Feature',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Cpu,
    title: 'Agents as Processes',
    description:
      'spawn / kill / wait / signal — full process lifecycle semantics. Process trees, state machines, zombie reaping. Real OS primitives, not simulations.',
    code: `rnix ps\n\nPID  STATE    AGENT          TOKENS\n 1   Running  code-analyst   1,204\n 2   Zombie   reviewer       3,891`,
    tag: 'Core',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: FolderTree,
    title: 'Everything is a File',
    description:
      'Tools → /dev/ devices. MCP → /mnt/ mounts. Agent state → /proc/ files. One unified interface replaces fragmented tool/service/state abstractions.',
    code: `/proc/1/status   → Running\n/dev/llm/*        → LLM reasoning\n/dev/fs/src/      → Host filesystem\n/dev/shell        → Shell execution`,
    tag: 'VFS',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: FileCode2,
    title: 'Skills as Packages',
    description:
      'SKILL.md follows the Agent Skills open standard (agentskills.io). Write once, share everywhere — compatible with 30+ AI tools in the ecosystem.',
    code: `---\nname: code-analysis\ndescription: Analyze code quality\nallowed-tools:\n  - Read\n  - Grep\n---\n## Steps\n1. Read the target file...`,
    tag: 'Ecosystem',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Layers,
    title: '4-Layer Capability Stack',
    description:
      'Agent (identity) → Skill (how-to) → MCP (external services) → Device (native I/O). Each layer has clear responsibilities. No overlap, no gaps.',
    code: `Agent:  "code-analyst"\n  └─ Skill: "code-analysis"\n      └─ MCP: github-server\n          └─ Device: /dev/fs`,
    tag: 'Architecture',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Zap,
    title: '45 Syscalls. One ABI.',
    description:
      'A stable, versioned syscall interface — the "constitution" of the OS. 45 syscalls covering process management, IPC, VFS, signals, capabilities, and debugging.',
    code: `// 45 syscalls across 7 domains\nSpawn Kill Wait Signal Send Recv Pipe\nCtxAlloc CtxRead CtxWrite CtxFree\nOpen Read Write Close Mount Stat\nCapGrant CapRevoke CapCheck\nDebugRecord Attach Snapshot`,
    tag: 'ABI',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
];

export default function FeaturesSection() {
  const { ref, isInView } = useInView(0.08);

  return (
    <section className="py-24 lg:py-32 section-padding" id="features">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            Core Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            OS-level primitives for AI agents
          </h2>
          <p className="text-midnight-400 text-lg">
            Not another wrapper. Rnix provides the foundational abstractions that frameworks
            keep trying — and failing — to build at the app layer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`glass-card-hover p-6 flex flex-col ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-md border ${feature.tagColor}`}
                  >
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-midnight-400 text-sm leading-relaxed mb-5 flex-1">
                  {feature.description}
                </p>

                <div className="bg-midnight-950/80 border border-midnight-800/50 rounded-lg p-3.5 font-mono text-xs leading-5 text-midnight-300 overflow-x-auto whitespace-pre">
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
