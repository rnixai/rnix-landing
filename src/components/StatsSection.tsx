import { useInView } from '../hooks/useInView';

const STATS = [
  { value: '50+', label: 'Syscall ABI', detail: 'Process / Context / VFS / IPC / Signal', color: 'text-primary-container' },
  { value: '20+', label: 'LLM Providers', detail: 'OpenAI / Claude / Gemini / Groq / DeepSeek / Mistral / Ollama ...', color: 'text-secondary-container' },
  { value: '14', label: 'VFS Devices', detail: '/dev/llm/* /dev/fs /dev/shell /dev/memory/* /dev/web /dev/lsp /dev/tasks /dev/tty /dev/cron /proc/* /mnt/mcp/*', color: 'text-tertiary-fixed-dim' },
  { value: '5', label: 'Signal Types', detail: 'SIGTERM / SIGKILL / SIGINT / SIGPAUSE / SIGRESUME', color: 'text-primary-container' },
];

export default function StatsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-40 px-6" style={{ borderTop: '1px solid rgba(59, 75, 55, 0.15)', borderBottom: '1px solid rgba(59, 75, 55, 0.15)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary-container mb-3 font-mono">
            By The Numbers
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">
            Built on real primitives
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`font-headline text-6xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-gray-500">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
