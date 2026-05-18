import { useEffect, useRef, useState } from "react";

const row1Cards = [
  {
    name: "Rajiv Sharma",
    initials: "RS",
    background: "#3A3020",
    stars: 5,
    quote: "Sukrit Infrastructure Pvt Ltd delivered our dream home on time with zero compromises on quality. The finishing, the materials, everything exceeded our expectations. Truly a world-class experience right here in Assam.",
    label: "Homeowner · Sukrit Heights, Guwahati",
  },
  {
    name: "Priya & Anil Borah",
    initials: "PB",
    background: "#203A30",
    stars: 5,
    quote: "From the first site visit to handing over the keys, the entire team was professional, transparent, and genuinely caring. We never felt like just another customer. Highly recommend to any family looking to invest.",
    label: "Homeowners · Sukrit Greens, Jorhat",
  },
  {
    name: "Deepak Hazarika",
    initials: "DH",
    background: "#302030",
    stars: 5,
    quote: "The construction quality is unmatched in this region. I have compared multiple builders across Assam and Sukrit stands in a completely different league. Worth every rupee invested.",
    label: "Investor · Sukrit Elite, Dibrugarh",
  },
  {
    name: "Meenakshi Gogoi",
    initials: "MG",
    background: "#20302A",
    stars: 5,
    quote: "I was initially skeptical about investing in an under-construction property but Sukrit's transparency and regular progress updates gave me complete confidence. The final product is stunning.",
    label: "Homeowner · Sukrit Serene, Tezpur",
  },
  {
    name: "Bhaskar & Ritu Das",
    initials: "BD",
    background: "#2A2030",
    stars: 5,
    quote: "Our 3 BHK apartment is exactly as shown in the brochure — no hidden surprises, no last-minute changes. That integrity is rare and we are genuinely proud to call this our home.",
    label: "Homeowners · Sukrit Heights, Guwahati",
  },
  {
    name: "Ankur Kalita",
    initials: "AK",
    background: "#302820",
    stars: 5,
    quote: "As a commercial investor I have worked with multiple developers. Sukrit Infrastructure Pvt Ltd's professionalism, legal clarity, and delivery standards are truly at par with the best in India.",
    label: "Commercial Investor · Sukrit Business Park",
  },
];

const row2Cards = [
  {
    name: "Sanjukta Mahanta",
    initials: "SM",
    background: "#203028",
    stars: 5,
    quote: "The amenities, the landscaping, the lobby — everything has been crafted with such attention to detail. Living here feels premium every single day. Sukrit has truly raised the bar for Assam real estate.",
    label: "Homeowner · Sukrit Elite, Dibrugarh",
  },
  {
    name: "Pranab & Dipali Nath",
    initials: "PN",
    background: "#302020",
    stars: 5,
    quote: "We visited 12 different builders before choosing Sukrit. What made the difference was their honesty about timelines and costs. No hidden charges, no delays. Just pure professionalism.",
    label: "Homeowners · Sukrit Greens, Jorhat",
  },
  {
    name: "Rituraj Baruah",
    initials: "RB",
    background: "#282038",
    stars: 5,
    quote: "The customer support team even after possession has been exceptional. Any minor issue raised is resolved within 48 hours. This after-sales service is what truly makes Sukrit stand apart.",
    label: "Homeowner · Sukrit Heights, Guwahati",
  },
  {
    name: "Nirmali & Subhash Chetia",
    initials: "NC",
    background: "#203830",
    stars: 5,
    quote: "We relocated from Bangalore to Guwahati and were worried about the quality of construction here. Sukrit completely changed our perception. Metropolitan quality, hometown warmth.",
    label: "Homeowners · Sukrit Serene, Tezpur",
  },
  {
    name: "Gaurav Dutta",
    initials: "GD",
    background: "#383020",
    stars: 5,
    quote: "Bought a 4 BHK as an investment. The appreciation in value within 18 months has been remarkable. Beyond returns, the product quality itself is something I am proud to show guests.",
    label: "Investor · Sukrit Elite, Dibrugarh",
  },
];

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderStars = (count: number) => {
    return "★".repeat(count);
  };

  const renderCard = (card: any, index: number) => (
    <div
      key={index}
      className="flex-shrink-0"
      style={{
        width: "340px",
        minHeight: "220px",
        backgroundColor: "#1E1E1E",
        border: "1px solid #2E2E2E",
        borderRadius: "12px",
        padding: "28px 28px 22px 28px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        marginRight: "20px",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: card.background }}
          >
            {card.initials}
          </div>
          <div>
            <div
              className="text-[15px] font-semibold text-white"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {card.name}
            </div>
            <div
              className="text-[12px]"
              style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
            >
              Homeowner
            </div>
          </div>
        </div>
        <div
          className="text-[14px]"
          style={{ color: "#B8963E" }}
        >
          {renderStars(card.stars)}
        </div>
      </div>
      <p
        className="text-[14px] leading-[1.7]"
        style={{
          fontFamily: "DM Sans, sans-serif",
          color: "#CCCCCC",
          marginTop: "16px",
        }}
      >
        {card.quote}
      </p>
      <div
        className="text-[12px] mt-auto"
        style={{ fontFamily: "DM Sans, sans-serif", color: "#666666" }}
      >
        {card.label}
      </div>
    </div>
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 md:py-[100px]"
      style={{ backgroundColor: "#F8F5F0" }}
    >
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-[8%]"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* Section Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          <span
            className="block text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
          >
            CLIENT VOICES
          </span>
          <h2
            className="text-[52px] font-normal leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#1C1C1C" }}
          >
            What Our Homeowners Are Saying
          </h2>
        </div>

        {/* Row 1 */}
        <div
          className="overflow-hidden mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          <div
            className="flex"
            style={{
              willChange: "transform",
              animation: "scrollLeft 35s linear infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {[...row1Cards, ...row1Cards].map((card, index) => renderCard(card, index))}
          </div>
        </div>

        {/* Row 2 */}
        <div
          className="overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          <div
            className="flex"
            style={{
              willChange: "transform",
              animation: "scrollLeft 50s linear infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {[...row2Cards, ...row2Cards].map((card, index) => renderCard(card, index))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          section h2 {
            font-size: 36px !important;
          }
          .flex-shrink-0 {
            width: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
