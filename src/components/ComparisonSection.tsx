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
      {status === 'yes' && <Check className="w-4 h-4 text-emerald-400" aria-hidden />}
      {status === 'partial' && <Minus className="w-4 h-4 text-amber-400" aria-hidden />}
      {status === 'no' && <X className="w-4 h-4 text-midnight-600" aria-hidden />}
      <span className="sr-only">{label}</span>
    </span>
  );
}

function MobileStatusCell({ status, label }: { status: 'yes' | 'no' | 'partial'; label: string }) {
  const statusText = status === 'yes' ? 'Native' : status === 'partial' ? 'Partial' : 'None';
  return (
    <div className="flex flex-col items-center gap-1">
      <StatusIcon status={status} />
      <span className="text-[11px] text-midnight-500">{label}</span>
      <span className="text-[10px] font-medium text-midnight-400">{statusText}</span>
    </div>
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
    <section className="py-24 lg:py-32 section-padding bg-midnight-950/50" id="comparison">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            Comparison
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Framework vs. Operating System
          </h2>
          <p className="text-midnight-400 text-lg">
            Frameworks simulate OS capabilities at the app layer. Rnix provides them natively.
          </p>
        </div>

        <div
          className={`hidden sm:block glass-card overflow-hidden ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-midnight-800/60">
                  <th scope="col" className="text-left text-sm font-medium text-midnight-400 py-4 px-6 w-[280px]">
                    Capability
                  </th>
                  <th scope="col" className="text-center text-sm font-semibold text-cyan-400 py-4 px-4 bg-cyan-500/5">
                    Rnix
                  </th>
                  <th scope="col" className="text-center text-sm font-medium text-midnight-400 py-4 px-4">
                    LangGraph
                  </th>
                  <th scope="col" className="text-center text-sm font-medium text-midnight-400 py-4 px-4">
                    AutoGen
                  </th>
                  <th scope="col" className="text-center text-sm font-medium text-midnight-400 py-4 px-4">
                    CrewAI
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-midnight-800/30 transition-colors hover:bg-midnight-900/30 ${
                      i % 2 === 0 ? '' : 'bg-midnight-900/10'
                    }`}
                  >
                    <td className="text-midnight-300 py-3.5 px-6 font-mono text-xs">
                      {row.feature}
                    </td>
                    <td className="text-center py-3.5 px-4 bg-cyan-500/5">
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
          <div className="px-6 py-4 border-t border-midnight-800/40 flex items-center gap-6 text-xs text-midnight-500">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Native support
            </div>
            <div className="flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-amber-400" /> Partial / simulated
            </div>
            <div className="flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-midnight-600" /> Not available
            </div>
          </div>
        </div>

        <div
          className={`sm:hidden flex flex-col gap-3 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {COMPARISON.map((row) => (
            <div key={row.feature} className="glass-card p-4">
              <div className="text-xs font-mono text-midnight-200 mb-3">{row.feature}</div>
              <div className="grid grid-cols-4 gap-2">
                <MobileStatusCell status={row.rnix} label="Rnix" />
                {COMPETITORS.map((name) => (
                  <MobileStatusCell key={name} status={getCompetitorStatus(row, name)} label={name} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-midnight-500">
            <div className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> Native
            </div>
            <div className="flex items-center gap-1">
              <Minus className="w-3 h-3 text-amber-400" /> Partial
            </div>
            <div className="flex items-center gap-1">
              <X className="w-3 h-3 text-midnight-600" /> None
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
