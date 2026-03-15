import { useInView } from '../hooks/useInView';

const LAYERS = [
  {
    label: 'AgentShell CLI',
    desc: 'rnix "intent" / strace / ps / compose',
    color: 'border-cyan-500/40 bg-cyan-500/5',
    textColor: 'text-cyan-300',
  },
  {
    label: 'Agent + Skill Definitions',
    desc: 'agent.yaml + instructions.md + SKILL.md',
    color: 'border-cyan-600/30 bg-cyan-600/5',
    textColor: 'text-cyan-400',
  },
  {
    label: 'Microkernel',
    desc: 'Process Model / VFS / Context / Syscall ABI',
    color: 'border-midnight-600/60 bg-midnight-800/40',
    textColor: 'text-white',
    highlight: true,
  },
  {
    label: 'Driver Layer',
    desc: '/dev/llm/*  /dev/fs  /dev/shell  /mnt/mcp/',
    color: 'border-midnight-700/40 bg-midnight-900/40',
    textColor: 'text-midnight-200',
  },
  {
    label: 'Host OS + Multi-LLM Providers',
    desc: 'Go runtime / goroutines / channels / pluggable LLM backends',
    color: 'border-midnight-800/40 bg-midnight-950/60',
    textColor: 'text-midnight-400',
  },
];

const FLOW_STEPS = [
  { step: '01', title: 'Define', desc: 'Write agent.yaml + SKILL.md to declare who the agent is and what it can do.' },
  { step: '02', title: 'Spawn', desc: 'rnix "analyze this code" --agent=code-analyst creates a process with full lifecycle.' },
  { step: '03', title: 'Reason', desc: 'The kernel drives a reasonStep loop: LLM call → tool execution → context update → repeat.' },
  { step: '04', title: 'Trace', desc: 'rnix strace 1 shows every syscall — what was read, what was called, what went wrong.' },
];

export default function ArchitectureSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-20 lg:py-28 section-padding bg-midnight-950/50" id="architecture">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            How Rnix works
          </h2>
          <p className="text-midnight-400 text-lg">
            A Gamma hybrid architecture — microkernel reliability at the bottom,
            emergent innovation potential at the top.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div
            className={`${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <h3 className="text-sm font-semibold tracking-widest uppercase text-midnight-500 mb-6">
              System Stack
            </h3>
            <div className="flex flex-col gap-2">
              {LAYERS.map((layer) => (
                <div
                  key={layer.label}
                  className={`border rounded-xl px-3 sm:px-5 py-3 sm:py-4 transition-colors ${layer.color} ${
                    layer.highlight ? 'ring-1 ring-cyan-500/20' : ''
                  }`}
                >
                  <div className={`font-semibold text-sm ${layer.textColor}`}>
                    {layer.label}
                  </div>
                  <div className="text-[10px] sm:text-xs text-midnight-500 font-mono mt-1 break-words sm:break-normal">
                    {layer.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-midnight-900/40 border border-midnight-800/40">
              <p className="text-xs text-midnight-500 leading-relaxed">
                <span className="text-midnight-300 font-medium">Go language mapping:</span>{' '}
                goroutine = agent process, channel = IPC, interface = syscall contract.
                Single binary, zero external dependencies.
              </p>
            </div>
          </div>

          <div
            className={`${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            <h3 className="text-sm font-semibold tracking-widest uppercase text-midnight-500 mb-6">
              Execution Flow
            </h3>
            <div className="flex flex-col gap-5">
              {FLOW_STEPS.map((item, i) => (
                <div key={item.step} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-midnight-900 border border-midnight-700/60 flex items-center justify-center text-xs font-bold text-cyan-400 group-hover:border-cyan-600/40 transition-colors">
                      {item.step}
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-midnight-800/60 my-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-midnight-400 leading-relaxed">{item.desc}</p>
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
