import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, BookOpen } from 'lucide-react';
import RnixLogo from './RnixLogo';
import { withUtm } from '../utils/utm';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#architecture' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Comparison', href: '#comparison' },
  { label: 'Capabilities', href: '#roadmap' },
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
      className="fixed top-0 w-full flex justify-between items-center px-6 sm:px-10 h-20 backdrop-blur-xl z-50"
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.8)', borderBottom: '1px solid rgba(59, 75, 55, 0.2)' }}
    >
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-8 lg:gap-12">
        <a href="#" className="flex items-center gap-2 group focus-ring">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <RnixLogo size={32} />
          </div>
          <span className="font-headline font-bold text-primary-container tracking-tighter text-xl uppercase">Rnix</span>
        </a>
        <div className="hidden lg:flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-headline tracking-widest uppercase text-[11px] text-gray-400 hover:text-primary-container transition-colors focus-ring"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href={withUtm('https://docs.rnix.ai/', 'docs_nav', 'cta')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Documentation (opens in new tab)"
          className="inline-flex items-center gap-2 text-xs font-headline tracking-widest uppercase text-gray-400 hover:text-primary-container transition-colors focus-ring"
        >
          <BookOpen className="w-4 h-4" />
          Docs
        </a>
        <a
          href={withUtm('https://github.com/rnixai/rnix', 'github_nav', 'cta')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in new tab)"
          className="inline-flex items-center gap-2 text-xs font-headline tracking-widest uppercase text-gray-400 hover:text-primary-container transition-colors focus-ring"
        >
          <Github className="w-4 h-4" />
          Star
        </a>
        <a
          href="#get-started"
          className="px-5 py-2 bg-primary-container text-on-primary text-xs font-headline font-bold uppercase tracking-widest hover:brightness-110 transition-all focus-ring"
        >
          Get Started
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        ref={toggleButtonRef}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors focus-ring"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div ref={mobileMenuRef} className="md:hidden absolute top-20 left-0 right-0 backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', borderBottom: '1px solid rgba(59, 75, 55, 0.2)' }}>
          <div className="px-6 py-6 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-headline tracking-widest uppercase text-sm text-gray-400 hover:text-primary-container transition-colors focus-ring min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(59, 75, 55, 0.2)' }}>
              <a
                href={withUtm('https://docs.rnix.ai/', 'docs_nav_mobile', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 font-headline tracking-widest uppercase text-sm text-gray-400 hover:text-primary-container transition-colors focus-ring min-h-[44px]"
              >
                <BookOpen className="w-4 h-4" />
                Documentation
              </a>
              <a
                href={withUtm('https://github.com/rnixai/rnix', 'github_nav_mobile', 'cta')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 font-headline tracking-widest uppercase text-sm text-gray-400 hover:text-primary-container transition-colors focus-ring min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#get-started"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-2 bg-primary-container text-on-primary text-sm font-headline font-bold uppercase tracking-widest hover:brightness-110 transition-all text-center focus-ring min-h-[44px] flex items-center justify-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
