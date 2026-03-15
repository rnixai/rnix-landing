import { useInView } from '../hooks/useInView';
import { Copy, Check, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { withUtm } from '../utils/utm';

const STEPS = [
  {
    step: '1',
    title: 'Install Rnix',
    desc: 'Single binary, zero external dependencies.',
    code: 'go install github.com/rnixai/rnix/cmd/rnix@latest',
  },
  {
    step: '2',
    title: 'Initialize configuration',
    desc: 'Creates ~/.config/rnix/ and .rnix/ with agents and skills directories.',
    code: `rnix init
# Creates: ~/.config/rnix/agents/ skills/ providers.yaml`,
  },
  {
    step: '3',
    title: 'Run and trace',
    desc: 'Spawn an agent and watch every syscall. Daemon auto-starts on first use.',
    code: `rnix -i "Analyze the code quality of ./cmd/main.go"

# In another terminal:
rnix strace 1`,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <button
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md bg-midnight-800/60 text-midnight-500 hover:text-cyan-400 hover:bg-midnight-800 transition-colors focus-ring"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function GetStartedSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 lg:py-32 section-padding" id="get-started">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            Get Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Up and running in 15 minutes
          </h2>
          <p className="text-midnight-400 text-lg">
            Prerequisites: Go 1.26+ installed. Supports multiple LLM providers out of the box.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {STEPS.map((item, i) => (
            <div
              key={item.step}
              className={`flex gap-3 sm:gap-5 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-600 flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                  {item.step}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-midnight-800/60 my-2" />
                )}
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-midnight-400 mb-4">{item.desc}</p>
                <div className="relative terminal-window">
                  <div className="flex items-center gap-2 px-4 py-2 bg-midnight-900/80 border-b border-midnight-800/60">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-5 text-cyan-300 overflow-x-auto whitespace-pre">
                    {item.code}
                  </div>
                  <CopyButton text={item.code} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <a
            href={withUtm('https://docs.rnix.ai/', 'docs_get_started', 'cta')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the full documentation (opens in new tab)"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors focus-ring rounded-lg px-4 py-2"
          >
            <BookOpen className="w-4 h-4" />
            Read the full documentation
          </a>
        </div>
      </div>
    </section>
  );
}
