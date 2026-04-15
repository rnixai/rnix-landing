import { useInView } from '../hooks/useInView';
import { Cpu, FolderTree, Search, Brain, Bug, FileCode2, Monitor, Shield, Coins, Fingerprint, Database } from 'lucide-react';

const FEATURES = [
  {
    icon: Cpu,
    title: 'Everything is a Process',
    description:
      'Each agent is a process with its own PID, UUID v7, state machine, FD table. IPC messaging, pipes, signals, and process groups for multi-agent collaboration.',
    accentColor: 'var(--primary-container)',
  },
  {
    icon: FolderTree,
    title: 'Everything is a File',
    description:
      'LLMs, filesystem, shell, memory, web, LSP, and MCP tools are unified as VFS devices. Open/Read/Write/Close for all resources. 14 device types, 7 driver types.',
    accentColor: 'var(--secondary-container)',
  },
  {
    icon: Monitor,
    title: 'Visual Dashboard',
    description:
      'Multi-pane TUI with agent tree, timeline, heatmap, process detail, intent tree, security anomaly, and LLM conversation viewer. Three view modes.',
    accentColor: 'var(--tertiary-fixed-dim)',
  },
  {
    icon: Search,
    title: 'strace for AI',
    description:
      'See every syscall an agent makes — what it read, what it wrote, where it went wrong. Debug in minutes, not days.',
    accentColor: 'var(--primary-container)',
  },
  {
    icon: Brain,
    title: 'Autonomous Reasoning',
    description:
      'Unified reasoning loop where LLM autonomously selects actions. Stem cell differentiation lets agents auto-specialize based on intent.',
    accentColor: 'var(--secondary-container)',
  },
  {
    icon: Database,
    title: 'Agent Memory',
    description:
      'Persistent knowledge across sessions — commit facts, recall by search, build user profiles. Dual-scope storage with security scanning and async writeback.',
    accentColor: 'var(--tertiary-fixed-dim)',
  },
  {
    icon: Bug,
    title: 'Interactive Debugging',
    description:
      'gdb-style debugger: attach, breakpoints, step, inspect context. Time-travel replay with fork-continue. Step recording for full execution history.',
    accentColor: 'var(--tertiary-fixed-dim)',
  },
  {
    icon: Coins,
    title: 'Token Economy',
    description:
      'Budget pools, contract SLAs, agent reputation scoring, and skill synergy emergence. Optimize multi-agent resource allocation.',
    accentColor: 'var(--primary-container)',
  },
  {
    icon: Shield,
    title: 'Adaptive Immune Security',
    description:
      'Behavioral monitoring, anomaly detection, threat memory, and capability migration. Configurable and disabled by default.',
    accentColor: 'var(--secondary-container)',
  },
  {
    icon: FileCode2,
    title: '45+ Syscalls. One ABI.',
    description:
      'Stable, versioned syscall interface covering process, context, VFS, IPC, signals, capabilities, and supervisor. The "constitution" of the OS.',
    accentColor: 'var(--tertiary-fixed-dim)',
  },
];

export default function FeaturesSection() {
  const { ref, isInView } = useInView(0.08);

  return (
    <section className="py-40 px-6 bg-surface-container-lowest" id="features">
      <style>{`
        .feature-card {
          border: 1px solid rgba(59, 75, 55, 0.2);
          transition: border-color 0.3s;
        }
        .feature-card:hover {
          border-color: var(--card-accent);
        }
        .feature-card .feature-icon {
          color: var(--card-accent);
          background-color: color-mix(in srgb, var(--card-accent) 10%, transparent);
          transition: transform 0.3s;
        }
        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }
      `}</style>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-24">
          <h2 className="font-headline text-5xl md:text-7xl font-bold mb-6">Built for Autonomy.</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            OS-level primitives for AI agents. Not another wrapper — the real thing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`feature-card bg-surface-container p-10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 100}ms`,
                  '--card-accent': feature.accentColor,
                } as React.CSSProperties}
              >
                <div className="feature-icon w-16 h-16 flex items-center justify-center mb-8">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-3xl font-bold mb-4 uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
