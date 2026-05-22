import { useEffect, useRef, useState } from "react";

const row1Cards = [
  {
    name: "Rishabh Anand",
    initials: "RA",
    background: "#3A3020",
    stars: 5,
    quote: "It provides you the best guidance and support in building your dream projects ❤️",
    label: "Google Review",
  },
  {
    name: "Sahil Raj",
    initials: "SR",
    background: "#203A30",
    stars: 5,
    quote: "Best designs, guidance and work. Thanks for your support.",
    label: "Google Review",
  },
  {
    name: "Arshad Almas Ahmed",
    initials: "AA",
    background: "#302030",
    stars: 5,
    quote: "Excellent work….and helpful advice with proper guidance..friendly staff with 24 x7 support. Thank you for your precious response to our work.",
    label: "Google Review",
  },
  {
    name: "AMITABH BARUAH",
    initials: "AB",
    background: "#20302A",
    stars: 5,
    quote: "Sukrit infrastructure provides guidance services towards real estate projects of Jorhat. The company also provides materials for construction and also manpower for the same. Overall I am impressed by the services provided by the company. good job. 🙏",
    label: "Google Review",
  },
  {
    name: "Wisdom",
    initials: "W",
    background: "#2A2030",
    stars: 5,
    quote: "It is a highly professional and reliable company, delivering quality projects on time with excellent attention to detail and safety. Satisfied with their work....",
    label: "Google Review",
  },
  {
    name: "Sajjad Hazarika",
    initials: "SH",
    background: "#302820",
    stars: 5,
    quote: "No matter what type of construction services you want, Sukriti Infrastructure always give their best. I am highly impressed by their on-time project management.",
    label: "Google Review",
  },
  {
    name: "dibon baruah",
    initials: "DB",
    background: "#3A3020",
    stars: 5,
    quote: "Best professional work in town with best work experience and great service 🙏 Highly recommended for any construction work .surely will have great experience.",
    label: "Google Review",
  },
  {
    name: "Arnob Shyam",
    initials: "AS",
    background: "#203A30",
    stars: 5,
    quote: "Good behaviour and services. Professional workers which will guide you to your dream home.",
    label: "Google Review",
  },
  {
    name: "Shahid Anowar",
    initials: "SA",
    background: "#302030",
    stars: 5,
    quote: "Great construction company. They always complete on time and their work is top-level.",
    label: "Google Review",
  },
  {
    name: "Dharmaraj Saikia",
    initials: "DS",
    background: "#20302A",
    stars: 5,
    quote: "Excellent Service Done by SUKRIT INFRASTRUCTURE. I am highly impressed by them.",
    label: "Google Review",
  },
];

const row2Cards = [
  {
    name: "Diksha Malviya",
    initials: "DM",
    background: "#203028",
    stars: 5,
    quote: "Best design and full support Thank you sukrit infrastructure 👍👍",
    label: "Google Review",
  },
  {
    name: "Naba Gogoi",
    initials: "NG",
    background: "#302020",
    stars: 5,
    quote: "Nice service. Highly recommended for construction work in jorhat",
    label: "Google Review",
  },
  {
    name: "Sharmistha Dutta",
    initials: "SD",
    background: "#282038",
    stars: 5,
    quote: "Nice performance. Energetic boss with efficient labours",
    label: "Google Review",
  },
  {
    name: "Dpnk Dpnk",
    initials: "DD",
    background: "#203830",
    stars: 5,
    quote: "Good company..with exquisite services.....",
    label: "Google Review",
  },
  {
    name: "Rohit Yadav",
    initials: "RY",
    background: "#383020",
    stars: 5,
    quote: "It provides you a best guidance and support.",
    label: "Google Review",
  },
  {
    name: "Roktim Ranjan Borah",
    initials: "RR",
    background: "#203028",
    stars: 5,
    quote: "Amazing experience working with them on our project. Highly recommend!",
    label: "Google Review",
  },
  {
    name: "Aarohi Das",
    initials: "AD",
    background: "#302020",
    stars: 5,
    quote: "The entire team is extremely supportive and helpful from start to finish.",
    label: "Google Review",
  },
  {
    name: "Nikhil Lohiya",
    initials: "NL",
    background: "#282038",
    stars: 5,
    quote: "Best construction services in the area. The quality is exceptional.",
    label: "Google Review",
  },
  {
    name: "Mantu Sahoo",
    initials: "MS",
    background: "#203830",
    stars: 5,
    quote: "Great communication and flawless execution. Truly satisfied with the outcome.",
    label: "Google Review",
  },
  {
    name: "Pranshuchaudhary",
    initials: "P",
    background: "#383020",
    stars: 5,
    quote: "Delivered exactly what they promised, on time and with great quality.",
    label: "Google Review",
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
              Verified Client
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
              animation: "scrollLeft 20s linear infinite",
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
              animation: "scrollLeft 28s linear infinite",
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
