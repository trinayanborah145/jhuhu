import React, { useEffect, useRef } from "react";
import {
  IconBuildingArch,
  IconBolt,
  IconLayout2,
  IconDroplet,
  IconBrush,
  IconBox,
  IconGridDots,
  IconDoor,
  IconLayoutNavbar,
  IconArrowRight,
} from "@tabler/icons-react";

// All 40 brands data
const allBrands = [
  // CEMENT (5)
  { id: 1, category: "Cement", icon: IconBuildingArch, name: "Ambuja Cement", logo: "https://logo.clearbit.com/ambujacement.com" },
  { id: 2, category: "Cement", icon: IconBuildingArch, name: "Dalmia Cement", logo: "https://logo.clearbit.com/dalmiacement.com" },
  { id: 3, category: "Cement", icon: IconBuildingArch, name: "Duraguard Cement", logo: "https://logo.clearbit.com/nuvoco.com" },
  { id: 4, category: "Cement", icon: IconBuildingArch, name: "UltraTech Cement", logo: "https://logo.clearbit.com/ultratechcement.com" },
  { id: 5, category: "Cement", icon: IconBuildingArch, name: "Star Cement", logo: "https://logo.clearbit.com/starcement.co.in" },

  // ELECTRICAL (5)
  { id: 6, category: "Electrical", icon: IconBolt, name: "Polycab", logo: "https://logo.clearbit.com/polycab.com" },
  { id: 7, category: "Electrical", icon: IconBolt, name: "Anchor", logo: "https://logo.clearbit.com/in.panasonic.com" },
  { id: 8, category: "Electrical", icon: IconBolt, name: "Havells", logo: "https://logo.clearbit.com/havells.com" },
  { id: 9, category: "Electrical", icon: IconBolt, name: "V-Guard", logo: "https://logo.clearbit.com/vguard.in" },
  { id: 10, category: "Electrical", icon: IconBolt, name: "Microtek", logo: "https://logo.clearbit.com/microtekdirect.com" },

  // INTERIOR (5)
  { id: 11, category: "Interior", icon: IconLayout2, name: "Century Ply", logo: "https://logo.clearbit.com/centuryply.com" },
  { id: 12, category: "Interior", icon: IconLayout2, name: "Greenply", logo: "https://logo.clearbit.com/greenply.com" },
  { id: 13, category: "Interior", icon: IconLayout2, name: "Virco", logo: "https://logo.clearbit.com/vircoply.com" },
  { id: 14, category: "Interior", icon: IconLayout2, name: "Umda Panels" },
  { id: 15, category: "Interior", icon: IconLayout2, name: "Kutchina", logo: "https://logo.clearbit.com/kutchina.com" },

  // PLUMBING (4)
  { id: 16, category: "Plumbing", icon: IconDroplet, name: "Supreme", logo: "https://logo.clearbit.com/supreme.co.in" },
  { id: 17, category: "Plumbing", icon: IconDroplet, name: "Prince Piping", logo: "https://logo.clearbit.com/princepipes.com" },
  { id: 18, category: "Plumbing", icon: IconDroplet, name: "Hindware", logo: "https://logo.clearbit.com/hindware.com" },
  { id: 19, category: "Plumbing", icon: IconDroplet, name: "Aquant", logo: "https://logo.clearbit.com/aquantindia.com" },

  // PAINTS (5)
  { id: 20, category: "Paints", icon: IconBrush, name: "Berger Paints", logo: "https://logo.clearbit.com/bergerpaints.com" },
  { id: 21, category: "Paints", icon: IconBrush, name: "Birla Opus", logo: "https://logo.clearbit.com/birlaopus.com" },
  { id: 22, category: "Paints", icon: IconBrush, name: "Asian Paints", logo: "https://logo.clearbit.com/asianpaints.com" },
  { id: 23, category: "Paints", icon: IconBrush, name: "Nerolac", logo: "https://logo.clearbit.com/nerolac.com" },
  { id: 24, category: "Paints", icon: IconBrush, name: "British Paints", logo: "https://logo.clearbit.com/britishpaints.in" },

  // STEEL / TMT (4)
  { id: 25, category: "Steel", icon: IconBox, name: "Tata Tiscon 550 SD", logo: "https://logo.clearbit.com/tatatiscon.co.in" },
  { id: 26, category: "Steel", icon: IconBox, name: "Kamdhenu Steel", logo: "https://logo.clearbit.com/kamdhenulimited.com" },
  { id: 27, category: "Steel", icon: IconBox, name: "Elegant Steel", logo: "https://logo.clearbit.com/elegantsteel.in" },
  { id: 28, category: "Steel", icon: IconBox, name: "Tata Tiscon", logo: "https://logo.clearbit.com/tatatiscon.co.in" },

  // TILES (5)
  { id: 29, category: "Tiles", icon: IconGridDots, name: "Orient Bell", logo: "https://logo.clearbit.com/orientbell.com" },
  { id: 30, category: "Tiles", icon: IconGridDots, name: "Qmax" },
  { id: 31, category: "Tiles", icon: IconGridDots, name: "Johnson Tiles", logo: "https://logo.clearbit.com/hrjohnsonindia.com" },
  { id: 32, category: "Tiles", icon: IconGridDots, name: "Kajaria", logo: "https://logo.clearbit.com/kajariaceramics.com" },
  { id: 33, category: "Tiles", icon: IconGridDots, name: "Suncore" },

  // DOORS (3)
  { id: 34, category: "Doors", icon: IconDoor, name: "Century Doors", logo: "https://logo.clearbit.com/centuryply.com" },
  { id: 35, category: "Doors", icon: IconDoor, name: "Duro Door", logo: "https://logo.clearbit.com/sardaplywood.in" },
  { id: 36, category: "Doors", icon: IconDoor, name: "Greenply Doors", logo: "https://logo.clearbit.com/greenply.com" },

  // WINDOWS (4)
  { id: 37, category: "Windows", icon: IconLayoutNavbar, name: "Bhagwati Aluminium" },
  { id: 38, category: "Windows", icon: IconLayoutNavbar, name: "Thalco" },
  { id: 39, category: "Windows", icon: IconLayoutNavbar, name: "Cora Performance" },
  { id: 40, category: "Windows", icon: IconLayoutNavbar, name: "Fenesta", logo: "https://logo.clearbit.com/fenesta.com" },
];

// Split into two columns for alternating scroll
const col1Brands = allBrands.filter((_, idx) => idx % 2 === 0);
const col2Brands = allBrands.filter((_, idx) => idx % 2 !== 0);

/* ─── Single brand card ─── */
const ScrollCard = ({
  brand,
  column,
  index,
}: {
  brand: (typeof allBrands)[0];
  column: number;
  index: number;
}) => {
  const Icon = brand.icon;
  const isDark = column === 1 ? index % 2 === 0 : index % 2 !== 0;

  if (isDark) {
    return (
      <div className="w-full min-h-[100px] rounded-lg p-[20px_22px] mb-[14px] shrink-0 cursor-pointer transition-all duration-300 ease-out bg-[#1C1C1C] hover:bg-[#2A2A2A] hover:scale-[1.02] flex flex-col justify-between">
        <div className="flex items-center justify-between w-full">
          <span className="font-['DM_Sans'] text-[9px] uppercase tracking-[0.18em] py-[3px] px-[10px] rounded-full bg-[rgba(184,150,62,0.2)] text-[#B8963E] font-semibold">
            {brand.category}
          </span>
          <Icon className="w-[18px] h-[18px] text-[#B8963E]" stroke={1.5} />
        </div>
        <div className="flex flex-col mt-4">
          <h4 className="font-['Cormorant_Garamond'] text-[26px] font-medium leading-[1.1] tracking-[0.01em] text-white">
            {brand.name}
          </h4>
          <div className="w-6 h-[1px] bg-[#B8963E] mt-[10px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100px] rounded-lg p-[20px_22px] mb-[14px] shrink-0 cursor-pointer transition-all duration-300 ease-out bg-white border border-[#E2DDD8] hover:border-[#B8963E] hover:scale-[1.02] flex flex-col justify-between">
      <div className="flex items-center justify-between w-full">
        <span className="font-['DM_Sans'] text-[9px] uppercase tracking-[0.18em] py-[3px] px-[10px] rounded-full bg-[#F5F3F0] text-[#888888] font-semibold">
          {brand.category}
        </span>
        <Icon className="w-[18px] h-[18px] text-[#CCCCCC]" stroke={1.5} />
      </div>
      <div className="flex flex-col mt-4">
        <h4 className="font-['Cormorant_Garamond'] text-[26px] font-medium leading-[1.1] tracking-[0.01em] text-[#1C1C1C]">
          {brand.name}
        </h4>
        <div className="w-6 h-[1px] bg-[#E2DDD8] mt-[10px]" />
      </div>
    </div>
  );
};

/* ─── Main export ─── */
export function BrandPartners() {
  const leftTopRef = useRef<HTMLDivElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
    if (leftTopRef.current) observer.observe(leftTopRef.current);
    if (leftBottomRef.current) observer.observe(leftBottomRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brand-partners"
      className="bg-[#F8F5F0] py-[100px] px-6 md:px-12 w-full overflow-hidden"
    >
      <style>{`
        .partners-track-container {
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        @keyframes partnersScrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes partnersScrollDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .partners-scroll-up {
          animation: partnersScrollUp 30s linear infinite;
          animation-delay: 1.1s;
          animation-fill-mode: both;
          will-change: transform;
        }
        .partners-scroll-down {
          animation: partnersScrollDown 35s linear infinite;
          animation-delay: 1.1s;
          animation-fill-mode: both;
          will-change: transform;
        }

        /* Section reveal animations */
        .reveal-left-top {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.9s ease 0s, transform 0.9s ease 0s;
        }
        .reveal-left-bottom {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
        }
        .reveal-right {
          opacity: 0;
          transition: opacity 0.8s ease 0.35s;
        }
        .reveal-bottom-stats {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s;
        }
        .is-visible.reveal-left-top,
        .is-visible.reveal-left-bottom {
          opacity: 1;
          transform: translateX(0);
        }
        .is-visible.reveal-right  { opacity: 1; }
        .is-visible.reveal-bottom-stats {
          opacity: 1;
          transform: translateY(0);
        }

        /* CTA button shine sweep */
        .cta-brand-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-brand-btn::after {
          content: "";
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          transform: skewX(-20deg);
          transition: left 0.55s ease;
        }
        .cta-brand-btn:hover::after {
          left: 130%;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-[48px]">
        {/* ── Left Column (42%) ── */}
        <div className="w-full md:w-[42%] flex flex-col shrink-0">
          <div ref={leftTopRef} className="reveal-left-top">
            <div className="font-['DM_Sans'] text-[11px] uppercase tracking-[0.28em] text-[#B8963E] mb-4">
              TRUSTED BRANDS
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[40px] md:text-[56px] font-normal text-[#1C1C1C] leading-[1.1] mb-5">
              We Use Only
              <br />
              <span className="italic text-[#B8963E]">Best.</span>
            </h2>
          </div>

          <div ref={leftBottomRef} className="reveal-left-bottom">
            <p className="font-['DM_Sans'] text-[15px] text-[#888888] font-normal leading-[1.75] max-w-[360px] mb-10">
              Every material, fitting and fixture used in our projects is sourced
              from India's most trusted and premium brands — because quality
              begins long before construction does.
            </p>

            {/* ── CTA Button ── */}
            <a
              href="#contact"
              id="brand-cta-start-project"
              className="cta-brand-btn inline-flex items-center gap-3 bg-[#1C1C1C] text-white font-['DM_Sans'] text-[12px] uppercase tracking-[0.2em] font-semibold px-8 py-4 rounded-full transition-all duration-300 ease-out hover:bg-[#B8963E] hover:shadow-[0_8px_32px_rgba(184,150,62,0.4)] hover:gap-5 group"
            >
              Start Your Project
              <IconArrowRight
                className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1"
                stroke={2}
              />
            </a>
          </div>
        </div>

        {/* ── Right Column (58%) — infinite scroll ── */}
        <div
          ref={rightRef}
          className="w-full md:w-[58%] h-[380px] md:h-[500px] grid grid-cols-2 gap-4 overflow-hidden relative partners-track-container reveal-right"
        >
          {/* Column 1 — scrolls up */}
          <div className="flex flex-col partners-scroll-up">
            {col1Brands.map((brand, i) => (
              <ScrollCard key={`c1-orig-${brand.id}`} brand={brand} column={1} index={i} />
            ))}
            {col1Brands.map((brand, i) => (
              <ScrollCard key={`c1-dup-${brand.id}`} brand={brand} column={1} index={i} />
            ))}
          </div>

          {/* Column 2 — scrolls down */}
          <div className="flex flex-col partners-scroll-down">
            {col2Brands.map((brand, i) => (
              <ScrollCard key={`c2-orig-${brand.id}`} brand={brand} column={2} index={i} />
            ))}
            {col2Brands.map((brand, i) => (
              <ScrollCard key={`c2-dup-${brand.id}`} brand={brand} column={2} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Strip — Brand Count ── */}
      <div className="max-w-[1200px] mx-auto mt-14 border-t border-t-[#E2DDD8] pt-9">
        <div
          ref={statsRef}
          className="reveal-bottom-stats flex flex-col md:flex-row justify-center items-center gap-6 md:gap-[64px]"
        >
          <div className="flex flex-col items-center text-center">
            <span className="font-['Cormorant_Garamond'] text-[48px] font-normal text-[#1C1C1C] leading-[1.1]">
              40+
            </span>
            <span className="font-['DM_Sans'] text-[12px] text-[#888888] uppercase tracking-[0.15em] mt-1">
              Premium Brands
            </span>
          </div>

          <div className="w-full md:w-auto flex justify-center shrink-0">
            <div className="w-[100px] h-[1px] md:w-[1px] md:h-12 bg-[#E2DDD8]" />
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-['Cormorant_Garamond'] text-[48px] font-normal text-[#1C1C1C] leading-[1.1]">
              9
            </span>
            <span className="font-['DM_Sans'] text-[12px] text-[#888888] uppercase tracking-[0.15em] mt-1">
              Categories
            </span>
          </div>

          <div className="w-full md:w-auto flex justify-center shrink-0">
            <div className="w-[100px] h-[1px] md:w-[1px] md:h-12 bg-[#E2DDD8]" />
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-['Cormorant_Garamond'] text-[48px] font-normal text-[#1C1C1C] leading-[1.1]">
              100%
            </span>
            <span className="font-['DM_Sans'] text-[12px] text-[#888888] uppercase tracking-[0.15em] mt-1">
              Verified Quality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
