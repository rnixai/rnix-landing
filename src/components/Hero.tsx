import { ArrowRight, Github } from 'lucide-react';
import TerminalDemo from './TerminalDemo';
import { withUtm } from '../utils/utm';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      <div className="section-container section-padding relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900/80 border border-midnight-700/60 text-xs font-medium text-midnight-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse-slow" />
              Built with Go from scratch
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6">
              The Operating System for{' '}
              <span className="accent-text">AI Agents</span>
            </h1>

            <p className="text-lg sm:text-xl text-midnight-300 leading-relaxed mb-8 text-balance">
              Rnix treats agents as first-class OS processes. Debug multi-agent systems
              in <span className="text-cyan-400 font-medium">minutes, not days</span> with
              OS-level <code className="font-mono text-sm bg-midnight-800/80 px-1.5 py-0.5 rounded">strace</code> for AI.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
              <a href="#get-started" className="btn-primary text-base">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={withUtm('https://github.com/rnixai/rnix', 'github_hero', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Rnix on GitHub (opens in new tab)"
                className="btn-secondary text-base"
              >
                <Github className="w-4.5 h-4.5" />
                View on GitHub
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-midnight-400">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                Zero dependencies
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                Single binary
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                45 syscalls
              </div>
            </div>
          </div>

          <div className="lg:translate-x-4 min-w-0">
            <TerminalDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
