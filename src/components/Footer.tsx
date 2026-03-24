import { withUtm } from '../utils/utm';

export default function Footer() {
  return (
    <footer className="w-full px-10 py-12 bg-surface-container-lowest font-mono text-[11px] tracking-widest uppercase" style={{ borderTop: '1px solid rgba(59, 75, 55, 0.1)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <span className="text-primary-container font-bold text-lg font-headline">Rnix</span>
          <span className="text-gray-600">© {new Date().getFullYear()} RNIX FOUNDATION. OPEN SOURCE UNDER MIT.</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex gap-8">
            <a
              href={withUtm('https://twitter.com/decker502', 'twitter_footer', 'footer')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-container transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/TS5FUVndpm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-container transition-colors"
            >
              Discord
            </a>
            <a
              href={withUtm('https://github.com/rnixai/rnix', 'github_footer', 'footer')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-container transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-2 text-primary-container">
            <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse"></span>
            Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
