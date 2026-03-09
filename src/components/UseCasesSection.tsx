import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Search, FileText, GitPullRequest, ChevronRight } from 'lucide-react';

interface UseCase {
  id: string;
  icon: typeof Search;
  persona: string;
  role: string;
  title: string;
  before: string;
  after: string;
  terminal: string[];
  highlight: string;
}

const USE_CASES: UseCase[] = [
  {
    id: 'debug',
    icon: Search,
    persona: 'Platform Builder',
    role: 'Debugging an intermittent agent failure',
    title: 'From 3 days to 3 minutes',
    before:
      'A 3-agent code review system fails 1 in 20 times. Flat logs give no causal chain. Three days of searching thousands of lines.',
    after:
      'rnix strace shows the exact syscall where the agent read the wrong file. The bug is visible in the trace: logout.go instead of login.go.',
    terminal: [
      '$ rnix strace 1',
      '[3.42s] Open("/dev/fs/src/auth/logout.go")',
      '        ^^^ WRONG FILE — got logout.go',
      '',
      'Bug found in 3 minutes.',
    ],
    highlight: '3 days → 3 min',
  },
  {
    id: 'workflow',
    icon: GitPullRequest,
    persona: 'App Developer',
    role: 'Building a PR review pipeline',
    title: '20 lines of YAML, not 2000 lines of code',
    before:
      'Wiring 3 agents for PR review + code analysis + docs in LangGraph: state graphs, node logic, data passing. Estimated: 2 weeks.',
    after:
      'skill install 3 community skills, write a rnix-compose.yaml with depends_on, run rnix compose up. Done in 30 minutes.',
    terminal: [
      '$ skill install pr-reviewer code-analyst tech-writer',
      '$ rnix compose up',
      '',
      'PID  STATE    AGENT       DEPENDS_ON',
      ' 1   Done     reviewer    -',
      ' 2   Running  analyst     reviewer',
      ' 3   Pending  writer      analyst',
    ],
    highlight: '2 weeks → 30 min',
  },
  {
    id: 'diagnose',
    icon: FileText,
    persona: 'App Developer',
    role: 'Diagnosing an incorrect review result',
    title: 'Structured logs, zero kernel knowledge',
    before:
      'A PR review flags a correct function as "security vulnerability." Need to find out why without understanding Rnix internals.',
    after:
      'rnix log shows the reviewer\'s reasoning, categorized by [think] / [tool] / [output]. The diff was truncated — context budget too small.',
    terminal: [
      '$ rnix log 5',
      '',
      '[tool]  Read PR diff → 1240 tokens (truncated)',
      '[think] Partial code looks like injection...',
      '[output] "Security vulnerability detected"',
      '',
      'Fix: increase context_budget in compose.yaml',
    ],
    highlight: 'No kernel knowledge needed',
  },
];

export default function UseCasesSection() {
  const [activeCase, setActiveCase] = useState(USE_CASES[0].id);
  const { ref, isInView } = useInView(0.1);
  const current = USE_CASES.find((c) => c.id === activeCase)!;

  return (
    <section className="py-24 lg:py-32 section-padding" id="use-cases">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            Use Cases
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Real developer journeys
          </h2>
          <p className="text-midnight-400 text-lg">
            See how platform builders and app developers use Rnix to solve
            problems that existing frameworks can't.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 ${
            isInView ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon;
              const isActive = uc.id === activeCase;
              return (
                <button
                  key={uc.id}
                  onClick={() => setActiveCase(uc.id)}
                  className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl text-left transition-all duration-200 min-w-[180px] sm:min-w-[200px] lg:min-w-0 flex-shrink-0 lg:flex-shrink ${
                    isActive
                      ? 'bg-midnight-800/80 border border-cyan-700/30 text-white'
                      : 'border border-transparent text-midnight-400 hover:text-midnight-200 hover:bg-midnight-900/40'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-cyan-400' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-midnight-500 mb-0.5">{uc.persona}</div>
                    <div className="text-sm font-medium truncate">{uc.role}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 hidden lg:block ${isActive ? 'text-cyan-500' : 'text-midnight-700'}`} />
                </button>
              );
            })}
          </div>

          <div className="glass-card p-4 sm:p-6 lg:p-8 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{current.title}</h3>
                <p className="text-xs sm:text-sm text-midnight-400">{current.persona} / {current.role}</p>
              </div>
              <span className="text-xs sm:text-sm font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-lg whitespace-nowrap self-start">
                {current.highlight}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-red-400/80 mb-2">Before</div>
                <p className="text-sm text-midnight-400 leading-relaxed">{current.before}</p>
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400/80 mb-2">After</div>
                <p className="text-sm text-midnight-300 leading-relaxed">{current.after}</p>
              </div>
            </div>

            <div className="terminal-window">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-midnight-900/80 border-b border-midnight-800/60">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-[10px] text-midnight-600 font-mono ml-2">terminal</span>
              </div>
              <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs leading-5 overflow-x-auto">
                {current.terminal.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.startsWith('$')
                        ? 'text-cyan-400'
                        : line.includes('^^^') || line.includes('truncated')
                          ? 'text-red-400'
                          : line.includes('Fix:') || line.includes('Bug found') || line.includes('Done')
                            ? 'text-emerald-400'
                            : 'text-midnight-300'
                    }
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
