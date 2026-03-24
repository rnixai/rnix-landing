import { useInView } from '../hooks/useInView';
import { Check, X, Minus } from 'lucide-react';

interface CompRow {
  feature: string;
  rnix: 'yes' | 'no' | 'partial';
  langGraph: 'yes' | 'no' | 'partial';
  autoGen: 'yes' | 'no' | 'partial';
  crewAI: 'yes' | 'no' | 'partial';
}

const COMPARISON: CompRow[] = [
  // Architecture
  { feature: 'Runtime model', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'OS-level process lifecycle', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Virtual filesystem (VFS)', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Zero-dependency binary', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  // Orchestration
  { feature: 'Graph-based orchestration', rnix: 'no', langGraph: 'yes', autoGen: 'no', crewAI: 'no' },
  { feature: 'Role-based agent teams', rnix: 'partial', langGraph: 'no', autoGen: 'no', crewAI: 'yes' },
  { feature: 'DAG workflow (YAML)', rnix: 'yes', langGraph: 'partial', autoGen: 'partial', crewAI: 'partial' },
  { feature: 'Conversational multi-agent', rnix: 'no', langGraph: 'no', autoGen: 'yes', crewAI: 'no' },
  // Debugging & Observability
  { feature: 'Syscall-level tracing', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Step recording & replay', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Checkpointing & time-travel', rnix: 'partial', langGraph: 'yes', autoGen: 'no', crewAI: 'no' },
  { feature: 'Visual debugging dashboard', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  // State & Memory
  { feature: 'Persistent state management', rnix: 'yes', langGraph: 'yes', autoGen: 'partial', crewAI: 'partial' },
  { feature: 'Context per agent (isolated)', rnix: 'yes', langGraph: 'yes', autoGen: 'partial', crewAI: 'yes' },
  // Enterprise
  { feature: 'Enterprise compliance (SOC2/HIPAA)', rnix: 'no', langGraph: 'no', autoGen: 'yes', crewAI: 'yes' },
  { feature: 'Azure / cloud-native integration', rnix: 'no', langGraph: 'partial', autoGen: 'yes', crewAI: 'yes' },
  // Ecosystem
  { feature: 'Standard skill format', rnix: 'yes', langGraph: 'partial', autoGen: 'no', crewAI: 'no' },
  { feature: 'Multi-LLM provider support', rnix: 'yes', langGraph: 'yes', autoGen: 'yes', crewAI: 'yes' },
  { feature: 'IPC / pipes between agents', rnix: 'yes', langGraph: 'no', autoGen: 'partial', crewAI: 'no' },
  { feature: 'Supervisor auto-restart', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Human-in-the-loop approval', rnix: 'partial', langGraph: 'yes', autoGen: 'yes', crewAI: 'yes' },
];

const COMPETITORS = ['LangGraph', 'AutoGen', 'CrewAI'] as const;

function StatusIcon({ status }: { status: 'yes' | 'no' | 'partial' }) {
  const label = status === 'yes' ? 'Native support' : status === 'partial' ? 'Partial' : 'Not available';
  return (
    <span className="flex items-center justify-center gap-1.5">
      {status === 'yes' && <Check className="w-4 h-4 text-primary-container" aria-hidden />}
      {status === 'partial' && <Minus className="w-4 h-4 text-tertiary-fixed-dim" aria-hidden />}
      {status === 'no' && <X className="w-4 h-4 text-gray-600" aria-hidden />}
      <span className="sr-only">{label}</span>
    </span>
  );
}

function getCompetitorStatus(row: CompRow, name: string): 'yes' | 'no' | 'partial' {
  if (name === 'LangGraph') return row.langGraph;
  if (name === 'AutoGen') return row.autoGen;
  return row.crewAI;
}

export default function ComparisonSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-40 px-6 bg-surface-container-lowest" id="comparison">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-24">
          <h2 className="font-headline text-5xl md:text-7xl font-bold mb-6">OS vs. Frameworks</h2>
          <p className="text-on-surface-variant max-w-3xl mx-auto">
            LangGraph, AutoGen, and CrewAI are Python libraries. Rnix is an operating system.
            Different architecture, different capabilities, different trade-offs.
          </p>
        </div>

        <div
          className={`hidden sm:block glass-card overflow-hidden ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-surface-container">
                  <th scope="col" className="text-left text-sm font-medium text-on-surface-variant py-4 px-6 w-[280px]">
                    Capability
                  </th>
                  <th scope="col" className="text-center text-sm font-semibold text-secondary-container py-4 px-4 bg-secondary-container/5">
                    Rnix
                  </th>
                  <th scope="col" className="text-center text-sm font-medium text-on-surface-variant py-4 px-4">
                    LangGraph
                  </th>
                  <th scope="col" className="text-center text-sm font-medium text-on-surface-variant py-4 px-4">
                    AutoGen
                  </th>
                  <th scope="col" className="text-center text-sm font-medium text-on-surface-variant py-4 px-4">
                    CrewAI
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{ borderBottom: '1px solid rgba(59, 75, 55, 0.15)' }}
                    className={`transition-colors hover:bg-surface-container/50 ${
                      i % 2 === 0 ? '' : 'bg-surface-container/30'
                    }`}
                  >
                    <td className="text-on-surface py-3.5 px-6 font-mono text-xs">
                      {row.feature}
                    </td>
                    <td className="text-center py-3.5 px-4 bg-secondary-container/5">
                      <div className="flex justify-center">
                        <StatusIcon status={row.rnix} />
                      </div>
                    </td>
                    <td className="text-center py-3.5 px-4">
                      <div className="flex justify-center">
                        <StatusIcon status={row.langGraph} />
                      </div>
                    </td>
                    <td className="text-center py-3.5 px-4">
                      <div className="flex justify-center">
                        <StatusIcon status={row.autoGen} />
                      </div>
                    </td>
                    <td className="text-center py-3.5 px-4">
                      <div className="flex justify-center">
                        <StatusIcon status={row.crewAI} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface-container flex items-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary-container" /> Native support
            </div>
            <div className="flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-tertiary-fixed-dim" /> Partial / requires setup
            </div>
            <div className="flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-gray-600" /> Not available
            </div>
          </div>
        </div>

        {/* Mobile card view */}
        <div className="sm:hidden space-y-4">
          {COMPETITORS.map((comp) => (
            <div key={comp} className="glass-card p-4">
              <h3 className="text-sm font-semibold text-white mb-3">{comp}</h3>
              <div className="space-y-2">
                {COMPARISON.filter(r => getCompetitorStatus(r, comp) === 'yes' || r.rnix === 'yes').slice(0, 5).map((row) => (
                  <div key={row.feature} className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant truncate mr-2">{row.feature}</span>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="text-gray-500">Rnix</span>
                      <StatusIcon status={row.rnix} />
                      <span className="text-gray-500 ml-1">{comp.slice(0, 4)}</span>
                      <StatusIcon status={getCompetitorStatus(row, comp)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
