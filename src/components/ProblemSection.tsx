import { useInView } from '../hooks/useInView';

export default function ProblemSection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="py-40 px-6 max-w-7xl mx-auto" id="problems">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center" ref={ref}>
        <div className={`${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
          <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Frameworks are <span className="text-error">Black Boxes</span>.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            LangGraph, AutoGen, CrewAI — they all reinvent OS primitives at the app layer.
            Flat logs, no causal chain, no process isolation. When an agent fails 1 in 20 times,
            you spend days scanning thousands of lines.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-error font-mono">✕</span>
              <span className="text-sm font-mono uppercase tracking-wider text-on-surface">No process isolation</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-error font-mono">✕</span>
              <span className="text-sm font-mono uppercase tracking-wider text-on-surface">Opaque I/O streams</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-error font-mono">✕</span>
              <span className="text-sm font-mono uppercase tracking-wider text-on-surface">No syscall-level debugging</span>
            </div>
          </div>
        </div>

        <div className={`bg-surface-container p-12 relative ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ border: '1px solid rgba(0, 255, 65, 0.2)' }}>
          <div className="absolute -top-4 -left-4 bg-primary-container text-on-primary px-4 py-1 text-xs font-bold tracking-widest uppercase">
            The Solution
          </div>
          <h3 className="font-headline text-4xl font-bold mb-6 text-primary-container">Rnix is the OS.</h3>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
            Treat agents as native OS processes. Each gets a PID, state machine, FD table.
            Communication through standard file I/O. Debug with strace — see every syscall,
            every LLM call, every file read.
          </p>
          <a href="#architecture" className="text-primary-container font-headline font-bold text-sm tracking-widest uppercase flex items-center gap-2 group">
            Explore Architecture
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
