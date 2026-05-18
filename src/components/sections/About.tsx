export function About() {
  return (
    <section id="legacy" className="bg-[var(--ivory)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="curtain h-[60vh] lg:h-auto min-h-[500px] reveal">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
            alt="Construction site at dawn"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="px-6 lg:px-20 py-[100px] lg:py-[140px] flex items-center">
          <div className="max-w-[520px] reveal">
            <span className="eyebrow eyebrow-line">Our Legacy</span>
            <h2 className="font-display text-[34px] lg:text-[48px] mt-6 leading-[1.15]">
              Two Decades of Shaping Assam's Skyline.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.85] text-[var(--text-muted)]">
              From a single residential project in Guwahati to landmark developments across the state, Sukrit Infrastructure Pvt Ltd has spent twenty-five years quietly raising the standard of how Assam lives, works, and grows. We build with patience, with craft, and with a deep respect for the land we call home.
            </p>
            <span className="divider-gold mt-10" />
            <div className="mt-8 flex gap-12">
              <div>
                <div className="font-display text-[40px] font-light">
                  25<span className="text-[var(--gold)]">+</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mt-1">
                  Years
                </div>
              </div>
              <div>
                <div className="font-display text-[40px] font-light">
                  50<span className="text-[var(--gold)]">+</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mt-1">
                  Projects
                </div>
              </div>
            </div>
            <a href="#contact" className="story-link mt-10 inline-flex">
              Our Full Story <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
