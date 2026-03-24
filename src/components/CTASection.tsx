import { ArrowRight, Github, BookOpen } from 'lucide-react';
import RnixLogo from './RnixLogo';
import { withUtm } from '../utils/utm';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden bg-surface_container p-8 sm:p-12 lg:p-16">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <RnixLogo size={56} />
            </div>

            <h2 className="font-display text-headline-md font-bold text-white mb-4 text-balance">
              Stop debugging in the dark
            </h2>
            <p className="text-on_surface text-lg mb-8 leading-relaxed">
              The multi-agent framework era hit its ceiling. It's time for an operating system.
              Rnix gives you the primitives to build, debug, and compose AI agents at the right
              abstraction layer.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <a href="#get-started" className="btn-primary text-base">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={withUtm('https://docs.rnix.ai/', 'docs_cta_section', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read the documentation (opens in new tab)"
                className="inline-flex items-center gap-2 px-6 py-3 text-on_surface font-medium transition-all duration-200 hover:text-primary active:scale-[0.98] text-base focus-ring"
              >
                <BookOpen className="w-4 h-4" />
                Documentation
              </a>
              <a
                href={withUtm('https://github.com/rnixai/rnix', 'github_cta_section', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star Rnix on GitHub (opens in new tab)"
                className="inline-flex items-center gap-2 px-6 py-3 text-tertiary font-medium transition-all duration-200 hover:brightness-110 active:scale-[0.98] text-base focus-ring"
              >
                <Github className="w-[18px] h-[18px]" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
