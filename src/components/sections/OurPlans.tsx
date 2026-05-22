import { useEffect, useRef } from "react";
import {
  IconBuildingArch,
  IconShieldCheck,
  IconDroplet,
  IconTools,
  IconArrowRight,
  IconCircleCheck,
  IconHierarchy,
  IconAward,
} from "@tabler/icons-react";

const getWhatsAppUrl = (plan: { name: string; price: string; warranty: string; inclusions: { name: string; value: string }[] }) => {
  const number = "919101002790";
  const message = `Hello Sukrit Infrastructure,

I am interested in the *${plan.name}* for my construction project.

Plan Details:
- Price: ${plan.price}
- Warranty: ${plan.warranty}

Core Specifications:
${plan.inclusions.map(inc => `- ${inc.name}: ${inc.value}`).join('\n')}

Could you please guide me on the next steps, scheduling an estimator consultation, and obtaining a detailed quote?

Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

const getCustomEstimatorWhatsAppUrl = () => {
  const number = "919101002790";
  const message = `Hello Sukrit Infrastructure,

I would like to enquire about a *Custom Specification* / *Schedule of Rates* for my residential construction project.

Could you please connect me with one of your estimators to discuss our architectural blueprints and custom options?

Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export function OurPlans() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      const targetUrl = "/Sukrit_Infrastructure_Catalogue.pdf";
      const response = await fetch(targetUrl, { method: "HEAD" });
      if (response.ok) {
        const link = document.createElement("a");
        link.href = targetUrl;
        link.download = "Sukrit_Infrastructure_Catalogue.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.location.href =
          "mailto:info@sukritinfras.com?subject=Request for Sukrit Infrastructure Property Catalogue&body=Hello,%0D%0A%0D%0AI would like to request the latest Sukrit Infrastructure Property Catalogue for 2025.%0D%0A%0D%0AThank you!";
      }
    } catch {
      window.location.href =
        "mailto:info@sukritinfras.com?subject=Request for Sukrit Infrastructure Property Catalogue&body=Hello,%0D%0A%0D%0AI would like to request the latest Sukrit Infrastructure Property Catalogue for 2025.%0D%0A%0D%0AThank you!";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll(".plan-stack-card");
      
      if (window.innerWidth < 1024) {
        cards.forEach((card) => {
          const el = card as HTMLElement;
          el.style.transform = "";
          el.style.opacity = "";
          el.style.filter = "";
          el.style.zIndex = "";
        });
        return;
      }

      cards.forEach((card, index) => {
        const el = card as HTMLElement;
        el.style.zIndex = `${index + 1}`;
        
        const nextCard = cards[index + 1];
        if (nextCard) {
          const rect = el.getBoundingClientRect();
          const rectNext = nextCard.getBoundingClientRect();
          const cardHeight = rect.height || 500;
          
          const currentBottom = rect.top + cardHeight;
          const overlap = currentBottom - rectNext.top;
          const progress = Math.max(0, Math.min(overlap / cardHeight, 1));
          
          // Luxury 3D card-deck transitions
          const scale = 1 - progress * 0.06; // shrink to 94%
          const translateY = -progress * 20; // lift up slightly
          const opacity = 1 - progress * 0.45; // fade to 55%
          const brightness = 1 - progress * 0.35; // dim slightly
          
          el.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          el.style.opacity = `${opacity}`;
          el.style.filter = `brightness(${brightness})`;
        } else {
          el.style.transform = "scale(1) translateY(0px)";
          el.style.opacity = "1";
          el.style.filter = "brightness(1)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Execute immediately
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const plans = [
    {
      num: "01",
      name: "Basic Plan",
      price: "₹1,899 / sq.ft",
      subheading: "Efficient Foundations & Solid Construction",
      desc: "Perfect for budget-conscious homeowners who refuse to compromise on core structural integrity. Sourced with trusted local brands.",
      badge: "Download Our Catalogue",
      badgeColor: "#888888",
      accent: "#B8963E",
      warranty: "Lifetime Civil Work Warranty Â· 2 Years Material Warranty",
      inclusions: [
        { name: "TMT Steel", value: "Zeecon 500D / Icon / Durgapur" },
        { name: "Cement", value: "Nuvoco Duraguard / Ambuja / Dalmia" },
        { name: "Aggregate", value: "Bihubor Coarse / Kanhaighat Fine" },
        { name: "False Ceiling", value: "Regular Gypsum Boards" },
        { name: "Bricks", value: "A Class (1st) Quality Red Bricks" },
      ],
      icon: IconTools,
    },
    {
      num: "02",
      name: "Standard Plan",
      price: "₹2,099 / sq.ft",
      subheading: "Refined Finishes & Extended Durability",
      desc: "Our most popular package. Integrates premium plumbing materials, specialized CP fittings, and enhanced styling for high-traffic areas.",
      badge: "Download Our Catalogue",
      badgeColor: "#B8963E",
      accent: "#D4B870",
      warranty: "Lifetime Civil Work Warranty Â· 5 Years Material Warranty",
      inclusions: [
        { name: "TMT Steel", value: "Zeecon 500D / Icon / Durgapur" },
        { name: "Cement", value: "Nuvoco Duraguard / Ambuja / Dalmia" },
        { name: "Tiles (Nano)", value: "Q-Max / Suncore / Stonex Regular" },
        { name: "CP Fittings", value: "Oasis Premium / Regular Grade" },
        { name: "Plumbing Pipes", value: "Prince Piping (11 SDR / 13.5 SDR)" },
      ],
      icon: IconHierarchy,
    },
    {
      num: "03",
      name: "Luxury Plan",
      price: "₹2,299 / sq.ft",
      subheading: "Architectural Elegance & Luxury Fittings",
      desc: "Designed for premium residential landmarks. Impeccable finishes, false ceilings from USG Knauf, and elite copper electrification systems.",
      badge: "Download Our Catalogue",
      badgeColor: "#B8963E",
      accent: "#b8963e",
      warranty: "Lifetime Civil Work Warranty Â· 5 Years Material Warranty",
      inclusions: [
        { name: "TMT Steel", value: "Jindal Panther / Mythan / Kamdhenu" },
        { name: "CP Fittings", value: "Parryware Quality Series" },
        { name: "Ceilings", value: "USG Knauf Gypsum System" },
        { name: "Doors", value: "Duro / Virco Flush Doors with Mica Coating" },
        { name: "Electrification", value: "Havells / Microtek Wires & Anchor Switches" },
      ],
      icon: IconBuildingArch,
    },
    {
      num: "04",
      name: "Grand Royal Plan",
      price: "₹2,599 / sq.ft",
      subheading: "The Ultimate Masterpiece without Compromise",
      desc: "No compromises. Sourced strictly from India's most premium brands (Tata, JSW, Kajaria). Includes complete waterproofing & advanced UPVC window systems.",
      badge: "Download Our Catalogue",
      badgeColor: "#D4B870",
      accent: "#F8F5F0",
      warranty: "Lifetime Civil Work Warranty Â· 5 Years Material Warranty Â· Full Waterproofing",
      inclusions: [
        { name: "TMT Steel", value: "TATA Tiscon 550SD / JSW / Jindal Panther" },
        { name: "CP Fittings", value: "Hindware / Aquant Elite Series" },
        { name: "Tiles (Double Charge)", value: "Kajaria / Somany / Orientbell" },
        { name: "Waterproofing", value: "Dr. Fixit Raincoat Select (Complete System)" },
        { name: "Switches & Wires", value: "Havells Crabtree Concealed Electrification" },
      ],
      icon: IconAward,
    },
  ];

  return (
    <section
      id="packages-plans"
      ref={containerRef}
      className="bg-[#0F0F0F] text-white py-24 lg:py-[140px] px-6 lg:px-[8%] relative grain"
    >
      <style>{`
        .plans-container {
          display: flex;
          flex-direction: column;
          gap: 64px;
        }
        @media (min-width: 1024px) {
          .plans-container {
            flex-direction: row;
          }
        }

        .plans-left-panel {
          position: relative;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .plans-left-panel {
            width: 38%;
            position: sticky;
            top: 140px;
            height: fit-content;
          }
        }

        .plans-right-panel {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .plans-right-panel {
            width: 62%;
            gap: 60px;
          }
        }

        /* Stacked card styling */
        .plan-stack-card {
          position: relative;
          background: #161616;
          border: 1px solid rgba(226, 221, 216, 0.08);
          border-radius: 4px;
          padding: 36px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @media (min-width: 768px) {
          .plan-stack-card {
            padding: 48px 52px;
          }
        }
        @media (min-width: 1024px) {
          .plan-stack-card {
            position: sticky;
            top: 120px;
            transform-origin: top center;
            will-change: transform, opacity, filter;
          }
          .plan-stack-card:nth-child(1) { top: 120px; }
          .plan-stack-card:nth-child(2) { top: 140px; }
          .plan-stack-card:nth-child(3) { top: 160px; }
          .plan-stack-card:nth-child(4) { top: 180px; }
        }

        .plan-inclusion-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 14px 0;
          border-bottom: 1px solid rgba(226, 221, 216, 0.06);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.6;
        }
        .plan-inclusion-item:last-child {
          border-bottom: none;
        }

        .plans-cta-btn {
          position: relative;
          overflow: hidden;
          background: transparent;
          border: 1px solid #B8963E;
          color: #B8963E;
          transition: all 0.4s ease;
        }
        .plans-cta-btn:hover {
          background: #B8963E;
          color: #FFFFFF;
          box-shadow: 0 8px 24px rgba(184, 150, 62, 0.35);
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto plans-container">
        {/* Left Sticky Panel */}
        <div className="plans-left-panel">
          <div className="eyebrow eyebrow-line text-[#B8963E] mb-6">Pricing & Plans</div>
          <h2
            className="font-serif text-[42px] lg:text-[64px] font-normal leading-[1.05] tracking-tight text-white mb-6"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            Crafted for <br />
            <span className="italic text-[#B8963E]">Every Vision.</span>
          </h2>
          <p
            className="text-[15px] leading-[1.8] text-[#888888] font-normal max-w-[340px] mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We align with the highest benchmarks of structural engineering. Select the package that fits your dream and build with Assam's premier developer.
          </p>

          {/* Graphical Divider Details */}
          <div className="hidden lg:flex flex-col gap-6 mt-12 pr-12">
            <div style={{ height: "1px", background: "rgba(184, 150, 62, 0.25)" }} />
            <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.25em] text-[#AAAAAA]">
              <span>Warranty Certified</span>
              <span>100% Transparency</span>
            </div>
            <div className="flex gap-4 items-center mt-2 text-[#888888]">
              <IconShieldCheck size={28} color="#B8963E" style={{ flexShrink: 0 }} />
              <span className="text-[12px] leading-relaxed font-light">
                Every material standard list is legally documented inside the project agreement.
              </span>
            </div>
          </div>
        </div>

        {/* Right Sticky Stack Panel */}
        <div className="plans-right-panel">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div key={plan.name} className="plan-stack-card">
                {/* Accent Top Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    height: "4px",
                    background: plan.accent,
                    borderRadius: "4px 4px 0 0",
                  }}
                />

                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    {/* Badge */}
                    <button
                      onClick={handleDownload}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        fontWeight: 600,
                        color: plan.badgeColor,
                        background: "transparent",
                        border: `1px solid ${plan.badgeColor}`,
                        padding: "4px 10px",
                        borderRadius: "2px",
                        display: "inline-block",
                        marginBottom: "14px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = plan.badgeColor;
                        e.currentTarget.style.color = "#161616";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = plan.badgeColor;
                      }}
                    >
                      {plan.badge}
                    </button>
                    <h3
                      className="font-serif text-[32px] md:text-[40px] font-normal text-white leading-none"
                      style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span
                      className="font-serif text-[18px] md:text-[22px] text-[#B8963E] font-medium block"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[10px] text-[#888888] uppercase tracking-wider block mt-1">
                      Rate per Sq.Ft
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4
                    className="text-[14px] text-[#B8963E] uppercase tracking-wider mb-2 font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {plan.subheading}
                  </h4>
                  <p
                    className="text-[13px] leading-[1.65] text-[#AAAAAA] font-light"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {plan.desc}
                  </p>
                </div>

                {/* Inclusions list */}
                <div className="mb-10">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-4 pb-2 border-b border-b-white/5 font-semibold">
                    Core Specifications & Brands
                  </div>
                  <div className="flex flex-col">
                    {plan.inclusions.map((inc) => (
                      <div key={inc.name} className="plan-inclusion-item">
                        <span className="text-[#AAAAAA] font-normal">{inc.name}</span>
                        <span className="text-white font-medium text-right max-w-[65%]">
                          {inc.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and CTA of card */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-6 border-t border-t-white/5">
                  <div className="flex items-center gap-3">
                    <Icon size={24} color="#B8963E" style={{ flexShrink: 0 }} />
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-widest text-[#B8963E]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Sukrit Structural Shield
                      </div>
                      <div className="text-[12px] text-white/70 mt-0.5">{plan.warranty}</div>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plans-cta-btn inline-flex items-center gap-2 font-['DM_Sans'] text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3.5 rounded-full"
                  >
                    Enquire Now
                    <IconArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Closing CTA */}
      <div className="max-w-[1440px] mx-auto mt-24 lg:mt-[120px] pt-12 border-t border-white/5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-[#161616] p-8 md:p-12 lg:p-16 rounded-[4px] border border-white/5">
          <div className="max-w-[600px]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#B8963E] mb-3">
              Elite Customization
            </div>
            <h3
              className="font-serif text-[32px] md:text-[44px] font-normal leading-[1.1] text-white"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
            >
              Need a completely <br />
              <span className="italic text-[#B8963E]">Custom Specification?</span>
            </h3>
            <p
              className="text-[14px] leading-[1.7] text-[#888888] mt-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Whether you need to upgrade structural elements, customize woodwork, or introduce smart home systems, our estimators are ready to design a custom schedule of rates tailored specifically to your architectural blueprints.
            </p>
          </div>

          <a
            href={getCustomEstimatorWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#B8963E] text-white font-['DM_Sans'] text-[12px] uppercase tracking-[0.2em] font-bold px-8 py-4.5 rounded-full hover:bg-[#a58432] transition-colors duration-300 shadow-[0_8px_24px_rgba(184,150,62,0.25)] group"
          >
            Consult With Our Estimators
            <IconArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
