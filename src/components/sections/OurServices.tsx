import React, { useEffect, useRef } from "react";
import {
  IconBolt,
  IconLayout2,
  IconDroplet,
  IconBrush,
  IconTools,
  IconTrees,
  IconShield,
  IconBuilding,
  IconHammer,
  IconBuildingSkyscraper,
  IconClipboardText,
  IconHome,
  IconCompass,
  IconBriefcase,
} from "@tabler/icons-react";

const col1Services = [
  {
    id: 1,
    icon: IconHammer,
    title: "General Construction",
    description:
      "Comprehensive building solutions, managing every phase of construction with excellence.",
    isDark: true,
  },
  {
    id: 3,
    icon: IconBuildingSkyscraper,
    title: "Commercial Construction",
    description:
      "State-of-the-art office blocks, retail spaces, and commercial hubs engineered for growth.",
    isDark: false,
  },
  {
    id: 5,
    icon: IconClipboardText,
    title: "Consulting & Advisory Services",
    description:
      "Expert project feasibility, cost estimation, and strategic planning advisory services.",
    isDark: true,
  },
  {
    id: 7,
    icon: IconBolt,
    title: "Electrification",
    description:
      "Complete electrical installations, wiring and power systems for residential and commercial projects.",
    isDark: false,
  },
  {
    id: 9,
    icon: IconDroplet,
    title: "Plumbing",
    description:
      "End-to-end plumbing systems, pipelines and sanitary installations built to last.",
    isDark: true,
  },
  {
    id: 11,
    icon: IconTools,
    title: "Renovation & Remodeling",
    description:
      "Breathing new life into existing spaces with smart renovation and remodeling solutions.",
    isDark: false,
  },
  {
    id: 13,
    icon: IconTrees,
    title: "Landscaping & Outdoor",
    description:
      "Outdoor construction, landscaping and green space design for residential complexes.",
    isDark: true,
  },
];

const col2Services = [
  {
    id: 2,
    icon: IconHome,
    title: "Residential Construction",
    description:
      "Crafting bespoke high-end villas, premium apartments, and modern living communities.",
    isDark: false,
  },
  {
    id: 4,
    icon: IconCompass,
    title: "Design Build Services",
    description:
      "Seamless integration of architectural design and structural execution under one roof.",
    isDark: true,
  },
  {
    id: 6,
    icon: IconLayout2,
    title: "Interior Fit Out",
    description:
      "Premium interior finishing and fit out solutions tailored to your lifestyle and taste.",
    isDark: false,
  },
  {
    id: 8,
    icon: IconBrush,
    title: "Painting & More",
    description:
      "Professional painting, texturing and surface finishing for interiors and exteriors.",
    isDark: true,
  },
  {
    id: 10,
    icon: IconShield,
    title: "Waterproofing",
    description:
      "Advanced waterproofing solutions that protect your structure from water damage and seepage.",
    isDark: false,
  },
  {
    id: 12,
    icon: IconBuilding,
    title: "Structural Construction",
    description:
      "Full-scale structural construction with uncompromising quality and on-time delivery.",
    isDark: true,
  },
  {
    id: 14,
    icon: IconBriefcase,
    title: "Project Management",
    description:
      "Dedicated supervision, resource coordination, and timeline controls for premium execution.",
    isDark: false,
  },
];

const ServiceCard = ({ service }: { service: any }) => {
  const Icon = service.icon;
  if (service.isDark) {
    return (
      <div className="w-full min-h-[160px] rounded-xl p-[24px_24px_20px_24px] mb-4 shrink-0 cursor-pointer transition-all duration-350 ease-out bg-[#1C1C1C] hover:bg-[#2C2C2C] hover:scale-[1.02] group">
        <div className="w-10 h-10 rounded-lg bg-[rgba(184,150,62,0.15)] flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-[#B8963E]" stroke={1.5} />
        </div>
        <h3 className="font-['DM_Sans'] text-[16px] font-semibold mb-2 text-white">
          {service.title}
        </h3>
        <p className="font-['DM_Sans'] text-[13px] font-normal leading-[1.6] text-white/60 line-clamp-2">
          {service.description}
        </p>
        <div className="mt-[14px] font-['DM_Sans'] text-[12px] font-medium text-[#B8963E] inline-block group-hover:underline transition-all duration-200">
          Learn more &rarr;
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[160px] rounded-xl p-[24px_24px_20px_24px] mb-4 shrink-0 cursor-pointer transition-all duration-350 ease-out bg-white border border-[#E2DDD8] hover:bg-[#F5F3F0] hover:border-[#B8963E] hover:scale-[1.02] group">
      <div className="w-10 h-10 rounded-lg bg-[#F5F3F0] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[#1C1C1C]" stroke={1.5} />
      </div>
      <h3 className="font-['DM_Sans'] text-[16px] font-semibold mb-2 text-[#1C1C1C]">
        {service.title}
      </h3>
      <p className="font-['DM_Sans'] text-[13px] font-normal leading-[1.6] text-[#888888] line-clamp-2">
        {service.description}
      </p>
      <div className="mt-[14px] font-['DM_Sans'] text-[12px] font-medium text-[#1C1C1C] inline-block group-hover:underline transition-all duration-200">
        Learn more &rarr;
      </div>
    </div>
  );
};

export function OurServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTopRef = useRef<HTMLDivElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="our-services"
      ref={sectionRef}
      className="bg-[#F8F5F0] py-[100px] px-6 md:px-12 w-full overflow-hidden"
    >
      <style>{`
        .services-track-container {
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }
        
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        
        .service-scroll-up {
          animation: scrollUp 35s linear infinite;
          animation-delay: 1.1s;
          animation-fill-mode: both;
          will-change: transform;
        }
        
        .service-scroll-down {
          animation: scrollDown 40s linear infinite;
          animation-delay: 1.1s;
          animation-fill-mode: both;
          will-change: transform;
        }
        
        .services-track-container:hover .service-scroll-up,
        .services-track-container:hover .service-scroll-down {
          animation-play-state: paused;
        }

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

        .is-visible.reveal-left-top,
        .is-visible.reveal-left-bottom {
          opacity: 1;
          transform: translateX(0);
        }
        .is-visible.reveal-right {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-[48px]">

        {/* Left Column */}
        <div className="w-full md:w-[42%] flex flex-col shrink-0">
          <div ref={leftTopRef} className="reveal-left-top">
            <div className="font-['DM_Sans'] text-[11px] uppercase tracking-[0.28em] text-[#B8963E] mb-4">
              WHAT WE OFFER
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[38px] md:text-[56px] font-normal text-[#1C1C1C] leading-[1.1] mb-5">
              What You Need<br />We Deliver It.
            </h2>
          </div>

          <div ref={leftBottomRef} className="reveal-left-bottom">
            <p className="font-['DM_Sans'] text-[15px] text-[#888888] font-normal leading-[1.75] max-w-[360px] mb-10">
              From foundation to finish, Sukrit Infrastructure Pvt Ltd provides end-to-end construction and finishing services built on quality, reliability and timeless craftsmanship.
            </p>
            <a href="#contact" className="inline-block bg-transparent border border-[#1C1C1C] text-[#1C1C1C] font-['DM_Sans'] text-[11px] uppercase tracking-[0.12em] font-medium py-[13px] px-[28px] rounded-none hover:bg-[#1C1C1C] hover:text-white transition-all duration-350 ease-out text-center decoration-none">
              START YOUR PROJECT
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div
          ref={rightRef}
          className="w-full md:w-[58%] h-[360px] md:h-[480px] grid grid-cols-2 gap-4 overflow-hidden relative services-track-container reveal-right"
        >
          {/* Track 1 - Scrolling Up */}
          <div className="flex flex-col service-scroll-up">
            {col1Services.map((service, i) => (
              <ServiceCard key={`t1-1-${service.id}-${i}`} service={service} />
            ))}
            {col1Services.map((service, i) => (
              <ServiceCard key={`t1-2-${service.id}-${i}`} service={service} />
            ))}
          </div>

          {/* Track 2 - Scrolling Down */}
          <div className="flex flex-col service-scroll-down">
            {col2Services.map((service, i) => (
              <ServiceCard key={`t2-1-${service.id}-${i}`} service={service} />
            ))}
            {col2Services.map((service, i) => (
              <ServiceCard key={`t2-2-${service.id}-${i}`} service={service} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
