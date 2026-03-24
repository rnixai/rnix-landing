import { Github, Twitter } from 'lucide-react';
import RnixLogo from './RnixLogo';
import { withUtm } from '../utils/utm';

const LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'What Ships', href: '#roadmap' },
  ],
  resources: [
    { label: 'Documentation', href: 'https://docs.rnix.ai/', external: true, utmContent: 'docs_footer' },
    { label: 'Quick Start', href: 'https://docs.rnix.ai/guide/quick-start', external: true, utmContent: 'quick_start_footer' },
    { label: 'Intent System', href: 'https://docs.rnix.ai/guide/intent-system', external: true, utmContent: 'intent_footer' },
    { label: 'Autonomous Agents', href: 'https://docs.rnix.ai/guide/autonomous-agents', external: true, utmContent: 'autonomous_agents_footer' },
    { label: 'Syscall Reference', href: 'https://docs.rnix.ai/reference/', external: true, utmContent: 'syscall_footer' },
    { label: 'Agent Skills Standard', href: 'https://agentskills.io', external: true, utmContent: 'agentskills_footer' },
  ],
  community: [
    { label: 'GitHub', href: 'https://github.com/rnixai/rnix', external: true, utmContent: 'github_footer' },
    { label: 'Discussions', href: 'https://github.com/rnixai/rnix/discussions', external: true, utmContent: 'discussions_footer' },
    { label: 'Contributing', href: 'https://github.com/rnixai/rnix/blob/main/CONTRIBUTING.md', external: true, utmContent: 'contributing_footer' },
  ],
};

export default function Footer() {
  return (
    <footer className="section-padding">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 focus-ring inline-flex w-fit">
              <RnixLogo size={32} />
              <span className="text-lg font-bold text-white tracking-tight">Rnix</span>
            </a>
            <p className="text-sm text-on_surface_muted leading-relaxed mb-4 max-w-[240px]">
              The operating system for AI agents. Built with Go from scratch.
            </p>
            <div className="flex gap-3">
              <a
                href={withUtm('https://github.com/rnixai/rnix', 'github_icon_footer', 'footer')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rnix on GitHub (opens in new tab)"
                className="w-10 h-10 min-w-[44px] min-h-[44px] bg-surface_container flex items-center justify-center text-on_surface_muted hover:text-secondary transition-colors focus-ring"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={withUtm('https://twitter.com/decker502', 'twitter_icon_footer', 'footer')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rnix on Twitter (opens in new tab)"
                className="w-10 h-10 min-w-[44px] min-h-[44px] bg-surface_container flex items-center justify-center text-on_surface_muted hover:text-secondary transition-colors focus-ring"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-label-sm font-semibold tracking-wider uppercase text-on_surface_variant mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {LINKS.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-on_surface_muted hover:text-secondary transition-colors focus-ring py-1">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label-sm font-semibold tracking-wider uppercase text-on_surface_variant mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {LINKS.resources.map((link) => (
                <li key={link.label}>
                    <a
                    href={'utmContent' in link ? withUtm(link.href, link.utmContent, 'footer') : link.href}
                    {...('external' in link && link.external
                      ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (opens in new tab)` }
                      : {})}
                    className="text-sm text-on_surface_muted hover:text-secondary transition-colors focus-ring py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label-sm font-semibold tracking-wider uppercase text-on_surface_variant mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              {LINKS.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={withUtm(link.href, link.utmContent, 'footer')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in new tab)`}
                    className="text-sm text-on_surface_muted hover:text-secondary transition-colors focus-ring py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 bg-surface_container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on_surface_muted">
            Built from scratch in Go. Agents deserve an operating system.
          </p>
          <p className="text-xs text-on_surface_muted">
            &copy; {new Date().getFullYear()} Rnix. Open source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
