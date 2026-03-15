import { ArrowRight, Github } from 'lucide-react';
import RnixLogo from './RnixLogo';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl border border-midnight-700/40 bg-gradient-to-br from-midnight-900/80 via-midnight-900/60 to-cyan-950/20 p-8 sm:p-12 lg:p-16">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <RnixLogo size={56} />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Stop debugging in the dark
            </h2>
            <p className="text-midnight-300 text-lg mb-8 leading-relaxed">
              The multi-agent framework era hit its ceiling. It's time for an operating system.
              Rnix gives you the primitives to build, debug, and compose AI agents at the right
              abstraction layer.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#get-started" className="btn-primary text-base">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/rnixai/rnix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ember-500/40 text-ember-300 font-medium rounded-lg transition-all duration-200 hover:border-ember-400/60 hover:text-ember-200 hover:bg-ember-500/10 active:scale-[0.98] text-base"
              >
                <Github className="w-4.5 h-4.5" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
