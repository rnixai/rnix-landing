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

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-surface-container text-gray-500 hover:text-secondary-container transition-colors focus-ring"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-primary-container" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function GetStartedSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-40 px-6" id="get-started">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary-container mb-3 font-mono">
            Get Started
          </p>
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            Get Started in 15 Minutes
          </h2>
          <p className="text-on-surface-variant text-lg">
            Prerequisites: Go 1.26+ installed. Supports multiple LLM providers out of the box.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {STEPS.map((item, i) => (
            <div
              key={item.step}
              className={`flex gap-5 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-sm font-bold text-on-secondary-container">
                  {item.step}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-surface-bright my-2" />
                )}
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <h3 className="text-lg font-semibold text-white mb-1 font-headline">{item.title}</h3>
                <p className="text-sm text-on-surface-variant mb-4">{item.desc}</p>
                <div className="relative terminal-window">
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-container">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim/60" />
                      <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim/60" />
                      <div className="w-2 h-2 rounded-full bg-primary-container/60" />
                    </div>
                  </div>
                  <div className="p-4 font-mono text-xs leading-5 text-secondary-container overflow-x-auto whitespace-pre">
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
            className="inline-flex items-center gap-2 text-secondary-container hover:brightness-110 font-medium transition-colors focus-ring px-4 py-2"
          >
            <BookOpen className="w-4 h-4" />
            Read the full documentation
          </a>
        </div>
      </div>
    </section>
  );
}
