import { useInView } from '../hooks/useInView';

const LAYERS = [
  {
    label: 'CLI & AgentShell',
    desc: 'rnix -i "intent" / strace / ps / compose / run',
    color: 'bg-secondary-container/5',
    textColor: 'text-secondary-container',
  },
  {
    label: 'Agent + Skill Definitions',
    desc: 'agent.yaml + instructions.md + SKILL.md',
    color: 'bg-secondary-container/5',
    textColor: 'text-secondary-container',
  },
  {
    label: 'Microkernel',
    desc: 'Process Model / VFS / Context / IPC / 45-syscall ABI',
    color: 'bg-surface-container',
    textColor: 'text-white',
    highlight: true,
  },
  {
    label: 'Driver Layer',
    desc: '/dev/llm/claude  /dev/llm/cursor  /dev/fs  /dev/shell  /mnt/mcp/',
    color: 'bg-surface',
    textColor: 'text-on-surface',
  },
  {
    label: 'Host OS + Multi-LLM Providers',
    desc: 'Go runtime / goroutines / channels / pluggable LLM backends',
    color: 'bg-surface-container-lowest',
    textColor: 'text-on-surface-variant',
  },
];

const FLOW_STEPS = [
  { step: '01', title: 'Init', desc: 'Run rnix init to create ~/.config/rnix/ and .rnix/. Write agent.yaml + SKILL.md in agents/ and skills/.' },
  { step: '02', title: 'Spawn', desc: 'rnix -i "Analyze this code" --agent=code-analyst creates a process with full lifecycle. Daemon auto-starts on first use.' },
  { step: '03', title: 'Reason', desc: 'The kernel drives a reasonStep loop: LLM call → tool execution → context update → repeat.' },
  { step: '04', title: 'Trace', desc: 'rnix strace 1 shows every syscall — what was read, what was called, what went wrong.' },
];

export default function ArchitectureSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-40 px-6" id="architecture">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary-container mb-3 font-mono">
            Architecture
          </p>
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            How Rnix works
          </h2>
          <p className="text-on-surface-variant text-lg">
            A Gamma hybrid architecture — microkernel reliability at the bottom,
            emergent innovation potential at the top.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div
            className={`${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6 font-mono">
              System Stack
            </h3>
            <div className="flex flex-col gap-2">
              {LAYERS.map((layer) => (
                <div
                  key={layer.label}
                  className={`${layer.color} px-5 py-4 transition-colors ${
                    layer.highlight ? 'ring-1 ring-secondary-container/20' : ''
                  }`}
                >
                  <div className={`font-semibold text-sm ${layer.textColor}`}>
                    {layer.label}
                  </div>
                  <div className="text-xs text-gray-500 font-mono mt-1">
                    {layer.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-surface-container">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="text-on-surface font-medium">Go language mapping:</span>{' '}
                goroutine = agent process, channel = IPC, interface = syscall contract.
                Single binary, zero external dependencies.
              </p>
            </div>
          </div>

          <div
            className={`${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6 font-mono">
              Execution Flow
            </h3>
            <div className="flex flex-col gap-5">
              {FLOW_STEPS.map((item, i) => (
                <div key={item.step} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-secondary-container group-hover:brightness-110 transition-colors">
                      {item.step}
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-surface-bright my-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
