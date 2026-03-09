import { Github, Twitter } from 'lucide-react';
import RnixLogo from './RnixLogo';

const LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'What Ships', href: '#roadmap' },
  ],
  resources: [
    { label: 'Documentation', href: '#get-started' },
    { label: 'Quick Start', href: '#get-started' },
    { label: 'Syscall Reference', href: '#features' },
    { label: 'Agent Skills Standard', href: 'https://agentskills.io', external: true },
  ],
  community: [
    { label: 'GitHub', href: 'https://github.com/rnixai/rnix', external: true },
    { label: 'Discussions', href: 'https://github.com/rnixai/rnix/discussions', external: true },
    { label: 'Contributing', href: 'https://github.com/rnixai/rnix/blob/main/CONTRIBUTING.md', external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-midnight-800/60 section-padding">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <RnixLogo size={32} />
              <span className="text-lg font-bold text-white tracking-tight">Rnix</span>
            </a>
            <p className="text-sm text-midnight-500 leading-relaxed mb-4 max-w-[240px]">
              The operating system for AI agents. Built with Go from scratch.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/rnixai/rnix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-midnight-900/60 border border-midnight-800/60 flex items-center justify-center text-midnight-500 hover:text-cyan-400 hover:border-cyan-700/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/rnixai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-midnight-900/60 border border-midnight-800/60 flex items-center justify-center text-midnight-500 hover:text-cyan-400 hover:border-cyan-700/40 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-midnight-400 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {LINKS.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-midnight-500 hover:text-cyan-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-midnight-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-midnight-500 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-midnight-400 mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              {LINKS.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-midnight-500 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-midnight-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-midnight-600">
            Built from scratch in Go. Agents deserve an operating system.
          </p>
          <p className="text-xs text-midnight-700">
            &copy; {new Date().getFullYear()} Rnix. Open source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
