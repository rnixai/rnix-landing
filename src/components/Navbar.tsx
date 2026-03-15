import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Star, BookOpen } from 'lucide-react';
import RnixLogo from './RnixLogo';
import { withUtm } from '../utils/utm';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#architecture' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Comparison', href: '#comparison' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const menu = mobileMenuRef.current;
      const focusables = menu.querySelectorAll<HTMLElement>('a, button');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      first?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileOpen(false);
          toggleButtonRef.current?.focus();
          return;
        }
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            toggleButtonRef.current?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight-950/90 backdrop-blur-xl border-b border-midnight-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container section-padding">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5 group focus-ring rounded-md">
            <div className="transition-transform duration-200 group-hover:scale-105">
              <RnixLogo size={32} />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Rnix</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (opens in new tab)` }
                  : {})}
                className="px-3 py-2 text-sm text-midnight-300 hover:text-cyan-400 transition-colors duration-200 rounded-md focus-ring"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={withUtm('https://docs.rnix.ai/', 'docs_cta_nav', 'cta')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Documentation (opens in new tab)"
              className="inline-flex items-center gap-2 py-2 px-4 border border-midnight-600 text-midnight-200 font-medium rounded-lg transition-all duration-200 hover:border-cyan-700 hover:text-cyan-300 hover:bg-midnight-900/50 active:scale-[0.98] text-sm focus-ring"
            >
              <BookOpen className="w-4 h-4" />
              Docs
            </a>
            <a
              href={withUtm('https://github.com/rnixai/rnix', 'github_star_nav', 'cta')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star Rnix on GitHub (opens in new tab)"
              className="inline-flex items-center gap-2 py-2 px-4 border border-midnight-600 text-midnight-200 font-medium rounded-lg transition-all duration-200 hover:border-cyan-700 hover:text-cyan-300 hover:bg-midnight-900/50 active:scale-[0.98] text-sm focus-ring"
            >
              <Github className="w-4 h-4" />
              <Star className="w-3.5 h-3.5" />
              Star
            </a>
          </div>

          <button
            ref={toggleButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-midnight-300 hover:text-white transition-colors focus-ring rounded-md"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-midnight-950/95 backdrop-blur-xl border-b border-midnight-800/60">
          <div className="section-padding py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (opens in new tab)` }
                  : {})}
                className="px-3 py-2.5 text-sm text-midnight-300 hover:text-cyan-400 transition-colors rounded-md focus-ring min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-midnight-800/60">
              <a
                href={withUtm('https://docs.rnix.ai/', 'docs_cta_mobile', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Documentation (opens in new tab)"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 py-2 px-4 border border-cyan-700/50 text-cyan-300 font-medium rounded-lg transition-all duration-200 hover:border-cyan-600 hover:bg-cyan-500/10 active:scale-[0.98] text-sm min-h-[44px] focus-ring"
              >
                <BookOpen className="w-4 h-4" />
                Docs
              </a>
              <a
                href={withUtm('https://github.com/rnixai/rnix', 'github_star_mobile', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star Rnix on GitHub (opens in new tab)"
                className="inline-flex items-center gap-2 py-2 px-4 border border-midnight-600 text-midnight-200 font-medium rounded-lg transition-all duration-200 hover:border-cyan-700 hover:text-cyan-300 hover:bg-midnight-900/50 active:scale-[0.98] text-sm flex-1 justify-center min-h-[44px] focus-ring"
              >
                <Github className="w-4 h-4" />
                Star
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
