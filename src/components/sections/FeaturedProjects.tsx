import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";

/* ─── Gallery data ─── */
const images = [
  {
    src: "/gallery/staircase.png",
    label: "Foyer & Staircase",
    project: "Sukrit Heights",
    location: "Guwahati",
  },
  {
    src: "/gallery/bedroom-1.png",
    label: "Master Bedroom",
    project: "Sukrit Elite",
    location: "Dibrugarh",
  },
  {
    src: "/gallery/living.png",
    label: "Living Space",
    project: "Sukrit Greens",
    location: "Jorhat",
  },
  {
    src: "/gallery/dining.png",
    label: "Dining Area",
    project: "Sukrit Heights",
    location: "Guwahati",
  },
  {
    src: "/gallery/bedroom-2.png",
    label: "Suite Bedroom",
    project: "Sukrit Business Park",
    location: "Guwahati",
  },
  {
    src: "/gallery/kitchen.png",
    label: "Modular Kitchen",
    project: "Sukrit Greens",
    location: "Jorhat",
  },
  {
    src: "/gallery/bathroom.png",
    label: "Luxury Bath",
    project: "Sukrit Elite",
    location: "Dibrugarh",
  },
];

/* ─── Column layout config (5 columns, each with their image slots & offsets) ─── */
// Each column: { offset (px top padding to stagger), images: indices from `images` }
const columns = [
  { offset: 80,  items: [images[0], images[6]] },   // Col 1 – starts low
  { offset: 20,  items: [images[1], images[5]] },   // Col 2 – starts mid
  { offset: -20, items: [images[2]] },               // Col 3 – center HERO (tall)
  { offset: 40,  items: [images[3], images[4]] },   // Col 4 – starts mid-low
  { offset: 90,  items: [images[5], images[0]] },   // Col 5 – starts lowest
];

/* ─── Individual image card ─── */
function GalleryCard({
  img,
  isHero = false,
  delay = 0,
  isVisible,
}: {
  img: (typeof images)[0];
  isHero?: boolean;
  delay?: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl group cursor-pointer shrink-0"
      style={{
        height: isHero ? "520px" : "280px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <img
        src={img.src}
        alt={img.label}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <p
          className="text-white text-[10px] uppercase tracking-[0.2em] mb-1"
          style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
        >
          {img.project} · {img.location}
        </p>
        <p
          className="text-white text-[14px] font-medium"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {img.label}
        </p>
      </div>

      {/* Gold accent line at bottom on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: "#B8963E",
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

/* ─── Main export ─── */
export function FeaturedProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#F8F5F0] pt-[100px] pb-[80px] overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* Horizontal drag-scroll for mobile */
        .gallery-scroll::-webkit-scrollbar { display: none; }
        .gallery-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Section Header ── */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div>
          <span
            className="block text-[11px] uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
          >
            Our Work
          </span>
          <h2
            className="text-[40px] md:text-[60px] font-normal leading-[1.05]"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#1C1C1C" }}
          >
            Spaces We've
            <br />
            <em style={{ color: "#B8963E" }}>Crafted.</em>
          </h2>
        </div>

        <a
          href="#contact"
          id="projects-cta"
          className="inline-flex items-center gap-3 border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 rounded-full px-7 py-3 self-start md:self-auto group"
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
        >
          View All Projects
          <IconArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* ── 5-Column Staggered Masonry Grid ── */}
      {/* Desktop */}
      <div className="hidden md:block px-6 md:px-12">
        <div
          className="max-w-[1200px] mx-auto flex gap-4"
          style={{ alignItems: "flex-start" }}
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="flex-1 flex flex-col gap-4"
              style={{ paddingTop: `${col.offset}px` }}
            >
              {col.items.map((img, imgIdx) => (
                <GalleryCard
                  key={`${colIdx}-${imgIdx}`}
                  img={img}
                  isHero={colIdx === 2 && imgIdx === 0}
                  delay={colIdx * 0.03 + imgIdx * 0.02}
                  isVisible={isVisible}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile – horizontal scroll */}
      <div className="md:hidden">
        <div
          className="gallery-scroll flex gap-3 overflow-x-auto px-6 pb-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-[220px] h-[300px] rounded-xl overflow-hidden relative group cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`,
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
              >
                <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}>
                  {img.project}
                </p>
                <p className="text-white text-[13px]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  {img.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom note ── */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-12 mt-12 flex items-center gap-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        <div className="flex-1 h-[1px] bg-[#E2DDD8]" />
        <p
          className="text-[11px] uppercase tracking-[0.2em] shrink-0"
          style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
        >
          Real renders · Actual projects · Assam's finest interiors
        </p>
        <div className="flex-1 h-[1px] bg-[#E2DDD8]" />
      </div>
    </section>
  );
}
