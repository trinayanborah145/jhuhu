import { useCounter } from "@/hooks/use-counter";

const stats = [
  { n: 8, suffix: "+", label: "Years of Experience" },
  { n: 150, suffix: "+", label: "Projects Delivered" },
  { n: 150, suffix: "+", label: "Happy Families" },
  { n: 5, suffix: "", label: "Cities Across Assam" },
];

function Stat({ n, suffix, label }: (typeof stats)[number]) {
  const { ref, value } = useCounter(n);
  return (
    <div className="text-center px-6">
      <div
        ref={ref}
        className="font-display text-[56px] lg:text-[80px] font-light text-[var(--text-soft)] leading-none"
      >
        {value.toLocaleString()}
        <span className="text-[var(--gold)]">{suffix}</span>
      </div>
      <div className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-[120px] px-6 lg:px-12 bg-[var(--ivory)] border-y border-[var(--divider)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center reveal mb-20">
          <span className="eyebrow eyebrow-line">By the Numbers</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--divider)] reveal">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
