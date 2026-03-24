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
  { feature: 'Process lifecycle (spawn/kill/wait)', rnix: 'yes', langGraph: 'no', autoGen: 'partial', crewAI: 'no' },
  { feature: 'Syscall-level tracing (strace)', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Virtual filesystem (VFS)', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Standard Skill format (Agent Skills)', rnix: 'yes', langGraph: 'partial', autoGen: 'no', crewAI: 'no' },
  { feature: 'IPC / pipes between agents', rnix: 'yes', langGraph: 'partial', autoGen: 'partial', crewAI: 'partial' },
  { feature: 'Declarative compose (YAML)', rnix: 'yes', langGraph: 'no', autoGen: 'partial', crewAI: 'partial' },
  { feature: 'Supervisor auto-restart', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
  { feature: 'Zero-dependency binary', rnix: 'yes', langGraph: 'no', autoGen: 'no', crewAI: 'no' },
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
          <h2 className="font-headline text-5xl md:text-7xl font-bold mb-6">Framework vs. Operating System</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Frameworks simulate OS capabilities at the app layer. Rnix provides them natively.
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
              <Minus className="w-3.5 h-3.5 text-tertiary-fixed-dim" /> Partial / simulated
            </div>
            <div className="flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-gray-600" /> Not available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
