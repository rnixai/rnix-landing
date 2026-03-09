import { useState, useEffect } from 'react';
import { Menu, X, Github, Star } from 'lucide-react';
import RnixLogo from './RnixLogo';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#architecture' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Comparison', href: '#comparison' },
  { label: 'Get Started', href: '#get-started' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <a href="#" className="flex items-center gap-2.5 group">
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
                className="px-3 py-2 text-sm text-midnight-300 hover:text-cyan-400 transition-colors duration-200 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/rnixai/rnix"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2 !px-4 text-sm"
            >
              <Github className="w-4 h-4" />
              <Star className="w-3.5 h-3.5" />
              Star
            </a>
            <a href="#get-started" className="btn-primary !py-2 !px-4 text-sm">
              Get Started
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-midnight-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-midnight-950/95 backdrop-blur-xl border-b border-midnight-800/60">
          <div className="section-padding py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-midnight-300 hover:text-cyan-400 transition-colors rounded-md"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-midnight-800/60">
              <a
                href="https://github.com/rnixai/rnix"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2 !px-4 text-sm flex-1 justify-center"
              >
                <Github className="w-4 h-4" />
                Star
              </a>
              <a href="#get-started" className="btn-primary !py-2 !px-4 text-sm flex-1 justify-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
