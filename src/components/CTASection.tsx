import { ArrowRight, Github } from 'lucide-react';
import RnixLogo from './RnixLogo';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl border border-midnight-700/40 bg-gradient-to-br from-midnight-900/80 via-midnight-900/60 to-cyan-950/20 p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-700/8 rounded-full blur-[60px]" />
          </div>

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
                className="btn-secondary text-base"
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
