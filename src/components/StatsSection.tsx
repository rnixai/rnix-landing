import { useInView } from '../hooks/useInView';

const STATS = [
  { value: '10k+', label: 'Agents per Node', color: 'text-primary-container' },
  { value: '<2ms', label: 'I/O Latency', color: 'text-secondary-container' },
  { value: '99.9%', label: 'Memory Isolation', color: 'text-tertiary-fixed-dim' },
  { value: '14x', label: 'Density Increase', color: 'text-primary-container' },
];

export default function StatsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-40 px-6" style={{ borderTop: '1px solid rgba(59, 75, 55, 0.15)', borderBottom: '1px solid rgba(59, 75, 55, 0.15)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
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
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
