import { useEffect, useRef, useState } from "react";

export function FoundersMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="founders-message"
      ref={sectionRef}
      className="relative bg-[#FFFFFF] py-[70px] md:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Right Label (Absolute) */}
        <div className="hidden lg:block absolute top-0 right-12 text-[11px] text-[#CCCCCC] tracking-[0.1em]" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Founder's Message · 2025
        </div>

        <div className="flex flex-col md:flex-row gap-[64px] items-start">
          
          {/* Left Column (42%) */}
          <div className="w-full md:w-[42%] flex flex-col justify-between min-h-[536px]">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.28em] text-[#B8963E] mb-[24px]"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 1s ease, transform 1s ease",
                }}
              >
                Founder's Message
              </div>
              
              <h2
                className="text-[64px] md:text-[88px] font-normal text-[#1C1C1C] mb-[40px] leading-[0.95] tracking-[-0.01em]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 1s ease, transform 1s ease",
                }}
              >
                Our <br /> Vision.
              </h2>
              
              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s",
                }}
              >
                <p
                  className="text-[15px] font-normal text-[#888888] leading-[1.75] max-w-[320px] mb-[40px]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  At Sukrit Infrastructure Pvt Ltd, our values guide everything we build. 
                  They shape our approach, our decisions, and the way we serve 
                  every family and investor who trusts us.
                </p>

                <div className="w-[48px] h-[1px] bg-[#B8963E] mb-[16px]" />
                
                <div
                  className="text-[22px] italic font-normal text-[#1C1C1C]"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Sukrit Infrastructure Pvt Ltd
                </div>
                <div
                  className="text-[10px] font-normal tracking-[0.2em] text-[#888888] mt-1 uppercase"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  CIN U41001AS2026PTC029861 <span className="mx-2 opacity-50">|</span> UNIT OF AB GROUP
                </div>
                <div
                  className="text-[11px] uppercase tracking-[0.18em] text-[#888888] mt-[6px]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Founder & Managing Director
                </div>
              </div>
            </div>

            {/* Bottom Left Copyright */}
            <div className="mt-auto pt-[40px] lg:pt-0">
              <div
                className="text-[11px] text-[#CCCCCC]"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                © 2025 Sukrit Infrastructure Pvt Ltd. All Rights Reserved.
              </div>
            </div>
          </div>

          {/* Right Column (58%) */}
          <div className="w-full md:w-[58%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              
              {/* Card 1 - Type A */}
              <div
                className="flex flex-col min-h-[220px] md:min-h-[260px] p-[36px_32px] rounded-[14px] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                style={{
                  backgroundColor: "#1C1C1C",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s, background-color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2C2C2C";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1C1C1C";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 21l18 0" />
                    <path d="M9 8l1 0" />
                    <path d="M9 12l1 0" />
                    <path d="M9 16l1 0" />
                    <path d="M14 8l1 0" />
                    <path d="M14 12l1 0" />
                    <path d="M14 16l1 0" />
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                  </svg>
                </div>
                <div className="mt-auto pt-6">
                  <p
                    className="text-[14px] font-normal leading-[1.6] mb-[18px]"
                    style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.75)" }}
                  >
                    Building a stronger future, one foundation at a time — delivering quality that stands the test of time.
                  </p>
                  <div className="w-full h-[1px] mb-[16px]" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  <div
                    className="text-[14px] font-medium tracking-[0.02em] text-[#FFFFFF]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Quality First
                  </div>
                </div>
              </div>

              {/* Card 2 - Type B */}
              <div
                className="flex flex-col min-h-[220px] md:min-h-[260px] p-[36px_32px] rounded-[14px] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                style={{
                  backgroundColor: "#F5F3F0",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s, background-color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ECEAE6";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5F3F0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
                <div className="mt-auto pt-6">
                  <p
                    className="text-[14px] font-normal leading-[1.6] mb-[18px]"
                    style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
                  >
                    Budget-friendly and cost-effective construction solutions without compromising on durability or finish.
                  </p>
                  <div className="w-full h-[1px] bg-[#E2DDD8] mb-[16px]" />
                  <div
                    className="text-[14px] font-medium tracking-[0.02em] text-[#1C1C1C]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Affordable Excellence
                  </div>
                </div>
              </div>

              {/* Card 3 - Type B */}
              <div
                className="flex flex-col min-h-[220px] md:min-h-[260px] p-[36px_32px] rounded-[14px] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                style={{
                  backgroundColor: "#F5F3F0",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s, background-color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ECEAE6";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5F3F0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                    <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                  </svg>
                </div>
                <div className="mt-auto pt-6">
                  <p
                    className="text-[14px] font-normal leading-[1.6] mb-[18px]"
                    style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
                  >
                    Innovative techniques with a deep focus on sustainable and responsible construction practices.
                  </p>
                  <div className="w-full h-[1px] bg-[#E2DDD8] mb-[16px]" />
                  <div
                    className="text-[14px] font-medium tracking-[0.02em] text-[#1C1C1C]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Sustainable Building
                  </div>
                </div>
              </div>

              {/* Card 4 - Type B */}
              <div
                className="flex flex-col min-h-[220px] md:min-h-[260px] p-[36px_32px] rounded-[14px] transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                style={{
                  backgroundColor: "#F5F3F0",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s, background-color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ECEAE6";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5F3F0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
                    <path d="M15 19l2 2l4 -4" />
                  </svg>
                </div>
                <div className="mt-auto pt-6">
                  <p
                    className="text-[14px] font-normal leading-[1.6] mb-[18px]"
                    style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
                  >
                    Reliable, durable structures built to serve families and communities for generations to come.
                  </p>
                  <div className="w-full h-[1px] bg-[#E2DDD8] mb-[16px]" />
                  <div
                    className="text-[14px] font-medium tracking-[0.02em] text-[#1C1C1C]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Built to Last
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
