import { useInView } from '../hooks/useInView';
import { Bug, Puzzle, Users } from 'lucide-react';

const PROBLEMS = [
  {
    icon: Bug,
    title: 'Debugging Black Box',
    description:
      'Current frameworks dump flat logs. When an agent fails 1 in 20 times, you spend days scanning thousands of lines with no causal chain, no context snapshots.',
    stat: 'Days',
    statLabel: 'to locate intermittent bugs',
    color: 'text-red-400',
    borderColor: 'border-red-500/20',
    bgColor: 'bg-red-500/5',
  },
  {
    icon: Puzzle,
    title: 'Non-Reusable Capabilities',
    description:
      'Every project rebuilds the same agent skills from scratch. No standard format, no package manager, no way to share domain knowledge across teams.',
    stat: '0%',
    statLabel: 'skill reuse across projects',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
  },
  {
    icon: Users,
    title: 'Coordination Chaos',
    description:
      'Frameworks reinvent scheduling, isolation, and permissions at the app layer. The ceiling is structural: you can add features, but you can\'t add layers.',
    stat: '2000+',
    statLabel: 'lines to wire 3 agents',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
  },
];

export default function ProblemSection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="py-16 lg:py-24 section-padding" id="problems">
      <div className="section-container" ref={ref}>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Every framework hits the same ceiling
          </h2>
          <p className="text-midnight-400 text-lg">
            LangGraph, AutoGen, CrewAI, MetaGPT — they all reinvent OS primitives at the app layer.
            But app-layer abstractions have a structural ceiling.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className={`border border-midnight-800/50 rounded-xl bg-midnight-900/20 p-6 lg:p-8 transition-colors hover:border-midnight-700/60 ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <Icon className={`w-7 h-7 ${problem.color} mb-4`} />

                <h3 className="text-lg font-semibold text-white mb-3">{problem.title}</h3>
                <p className="text-midnight-400 text-sm leading-relaxed mb-6">{problem.description}</p>

                <div className={`pt-5 border-t border-midnight-800/60`}>
                  <div className={`text-2xl font-bold ${problem.color}`}>{problem.stat}</div>
                  <div className="text-xs text-midnight-500 mt-1">{problem.statLabel}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-midnight-500 text-sm">
            The answer isn't a better framework.{' '}
            <span className="text-midnight-300">It's an operating system.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
