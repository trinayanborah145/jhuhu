import React, { useEffect, useRef } from "react";
import { IconShieldCheck } from "@tabler/icons-react";

export function OurWarranty() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const head1Ref = useRef<HTMLDivElement>(null);
  const head2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = [
      labelRef,
      head1Ref,
      head2Ref,
      subtextRef,
      badgeRef,
      p1Ref,
      p2Ref,
      p3Ref,
      bandRef,
      ctaRef,
    ];
    elements.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="our-warranty"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111111] py-[120px]"
    >
      <style>{`
        @keyframes rotate-badge {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .outer-ring-animate {
          animation: rotate-badge 20s linear infinite;
        }
        .inner-circle-animate {
          animation: counter-rotate 20s linear infinite;
        }

        .reveal-warranty-label { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease 0s, transform 0.7s ease 0s; }
        .reveal-warranty-h1 { opacity: 0; transform: translateY(30px); transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s; }
        .reveal-warranty-h2 { opacity: 0; transform: translateY(30px); transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s; }
        .reveal-warranty-sub { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s; }
        .reveal-warranty-badge { opacity: 0; transform: scale(0.85); transition: opacity 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s, transform 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s; }
        .reveal-warranty-p1 { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s; }
        .reveal-warranty-p2 { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s; }
        .reveal-warranty-p3 { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s; }
        .reveal-warranty-band { opacity: 0; transition: opacity 0.8s ease 1.05s; }
        .reveal-warranty-cta { opacity: 0; transform: translateY(16px); transition: opacity 0.7s ease 1.2s, transform 0.7s ease 1.2s; }

        .is-visible.reveal-warranty-label,
        .is-visible.reveal-warranty-h1,
        .is-visible.reveal-warranty-h2,
        .is-visible.reveal-warranty-sub,
        .is-visible.reveal-warranty-p1,
        .is-visible.reveal-warranty-p2,
        .is-visible.reveal-warranty-p3,
        .is-visible.reveal-warranty-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .is-visible.reveal-warranty-badge {
          opacity: 1;
          transform: scale(1);
        }
        .is-visible.reveal-warranty-band {
          opacity: 1;
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[rgba(184,150,62,0.06)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-[rgba(184,150,62,0.04)] pointer-events-none z-0" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse, rgba(184,150,62,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full">
        {/* Top Centered Header */}
        <div className="max-w-[680px] mx-auto text-center px-6 mb-16">
          <div
            ref={labelRef}
            className="reveal-warranty-label font-['DM_Sans'] text-[11px] uppercase tracking-[0.32em] text-[#B8963E] mb-5"
          >
            OUR PROMISE TO YOU
          </div>
          <div
            ref={head1Ref}
            className="reveal-warranty-h1 font-['Cormorant_Garamond'] text-[52px] md:text-[80px] font-normal text-white leading-[0.95] tracking-[-0.01em]"
          >
            A Lifetime of
          </div>
          <div
            ref={head2Ref}
            className="reveal-warranty-h2 font-['Cormorant_Garamond'] text-[52px] md:text-[80px] font-normal text-white leading-[0.95] tracking-[-0.01em]"
          >
            <span className="italic text-[#B8963E]">Confidence.</span>
          </div>
          <p
            ref={subtextRef}
            className="reveal-warranty-sub font-['DM_Sans'] text-[16px] font-light text-[#888888] leading-[1.8] max-w-[520px] mx-auto mt-6"
          >
            Every structure we build comes with our unconditional{" "}
            <span className="text-white">lifetime warranty</span> on all civil
            work. Not a promise - a commitment carved in stone.
          </p>
        </div>

        {/* Central Focal Badge */}
        <div
          ref={badgeRef}
          className="reveal-warranty-badge mx-auto mb-16 w-[200px] h-[200px] md:w-[260px] md:h-[260px]"
        >
          <div className="w-full h-full rounded-full border border-[rgba(184,150,62,0.25)] flex items-center justify-center relative outer-ring-animate">
            {/* SVG Text Ring */}
            <svg
              viewBox="0 0 260 260"
              className="absolute inset-0 w-full h-full overflow-visible"
            >
              <path
                id="warranty-textPath"
                d="M 130 130 m -110 0 a 110 110 0 1 1 220 0 a 110 110 0 1 1 -220 0"
                fill="none"
              />
              <text
                className="font-['DM_Sans'] text-[10px] uppercase tracking-[0.2em]"
                fill="rgba(184,150,62,0.5)"
              >
                <textPath
                  href="#warranty-textPath"
                  startOffset="0%"
                  textLength="691"
                  lengthAdjust="spacingAndGlyphs"
                >
                  SUKRIT INFRASTRUCTURE PVT LTD • LIFETIME WARRANTY • SUKRIT
                  INFRASTRUCTURE PVT LTD • LIFETIME WARRANTY •{" "}
                </textPath>
              </text>
            </svg>

            {/* Inner Circle (Counter-rotating) */}
            <div className="absolute w-[150px] h-[150px] md:w-[190px] md:h-[190px] rounded-full bg-[#1C1C1C] border border-[rgba(184,150,62,0.3)] flex flex-col items-center justify-center inner-circle-animate">
              <IconShieldCheck
                size={32}
                className="text-[#B8963E] mb-2"
                stroke={1.5}
              />
              <div className="font-['DM_Sans'] text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-0.5">
                LIFETIME
              </div>
              <div className="font-['Cormorant_Garamond'] text-[22px] font-medium text-white tracking-[0.05em]">
                WARRANTY
              </div>
              <div className="w-8 h-px bg-[#B8963E] mt-2 mx-auto" />
            </div>
          </div>
        </div>

        {/* Warranty Pillars */}
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-center gap-0">
          {/* Pillar 1 */}
          <div
            ref={p1Ref}
            className="reveal-warranty-p1 flex-1 px-6 py-8 md:py-0 md:px-14 text-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)]"
          >
            <div className="font-['Cormorant_Garamond'] text-[56px] md:text-[64px] font-light text-white leading-none">
              ∞
            </div>
            <div className="w-6 h-px bg-[#B8963E] mx-auto mt-3.5 mb-3.5" />
            <h4 className="font-['DM_Sans'] text-[13px] font-medium uppercase tracking-[0.15em] text-white mb-2.5">
              Lifetime Coverage
            </h4>
            <p className="font-['DM_Sans'] text-[13px] font-normal text-[#666666] leading-[1.7] max-w-[200px] mx-auto">
              Our civil work warranty has no expiry. Your structure is
              protected forever.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            ref={p2Ref}
            className="reveal-warranty-p2 flex-1 px-6 py-8 md:py-0 md:px-14 text-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)]"
          >
            <div className="font-['Cormorant_Garamond'] text-[56px] font-light text-white leading-none">
              100%
            </div>
            <div className="w-6 h-px bg-[#B8963E] mx-auto mt-3.5 mb-3.5" />
            <h4 className="font-['DM_Sans'] text-[13px] font-medium uppercase tracking-[0.15em] text-white mb-2.5">
              Zero Compromise
            </h4>
            <p className="font-['DM_Sans'] text-[13px] font-normal text-[#666666] leading-[1.7] max-w-[200px] mx-auto">
              Every repair, rectification and fix under warranty is completely
              free of cost.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            ref={p3Ref}
            className="reveal-warranty-p3 flex-1 px-6 py-8 md:py-0 md:px-14 text-center"
          >
            <div className="font-['Cormorant_Garamond'] text-[56px] font-light text-white leading-none">
              24/7
            </div>
            <div className="w-6 h-px bg-[#B8963E] mx-auto mt-3.5 mb-3.5" />
            <h4 className="font-['DM_Sans'] text-[13px] font-medium uppercase tracking-[0.15em] text-white mb-2.5">
              Always Reachable
            </h4>
            <p className="font-['DM_Sans'] text-[13px] font-normal text-[#666666] leading-[1.7] max-w-[200px] mx-auto">
              Our dedicated support team is always available for any
              warranty-related concern.
            </p>
          </div>
        </div>

        {/* Full Width Band */}
        <div
          ref={bandRef}
          className="reveal-warranty-band w-full mt-20 py-8 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-6"
        >
          <div className="max-w-[700px] mx-auto text-center font-['Cormorant_Garamond'] text-[24px] md:text-[32px] italic font-normal text-white leading-[1.3]">
            We do not just build structures - we build relationships that{" "}
            <span className="text-[#B8963E] italic">last a lifetime.</span>
          </div>
        </div>

        {/* CTA Area */}
        <div
          ref={ctaRef}
          className="reveal-warranty-cta max-w-[900px] mx-auto mt-16 px-6 flex flex-col md:flex-row justify-center items-center gap-5"
        >
          <div className="font-['DM_Sans'] text-[15px] text-[#666666] text-center md:text-left">
            Ready to build with confidence?
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto bg-[#B8963E] text-white border-none py-[14px] px-[36px] rounded-full font-['DM_Sans'] text-[12px] uppercase tracking-[0.14em] font-medium shadow-[0_8px_32px_rgba(184,150,62,0.25)] hover:bg-[#9E7D32] hover:shadow-[0_12px_40px_rgba(184,150,62,0.4)] hover:-translate-y-[2px] transition-all duration-350 ease-out cursor-pointer"
          >
            START YOUR PROJECT &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
