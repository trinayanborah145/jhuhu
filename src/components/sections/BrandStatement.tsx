import { useEffect, useRef, useState } from 'react';

export function BrandStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount(30, setCount1);
            animateCount(200, setCount2);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = (target: number, setter: (value: number) => void) => {
    const duration = 1200;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(easedProgress * target);
      setter(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-[100px] px-6 lg:px-[8%]" style={{ backgroundColor: '#F8F5F0' }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column - 55% width */}
        <div className="lg:col-span-7 flex flex-col justify-center reveal">
          <h2
            className="font-serif text-[24px] lg:text-[36px] font-normal leading-[1.45] text-[#1a1a1a] max-w-[580px]"
            style={{ fontFamily: 'Playfair Display, Cormorant Garamond, serif' }}
          >
            With 30+ years of trusted real estate development and infrastructure excellence, Sukrit Infrastructure Pvt Ltd has an unmatched legacy of delivery and a proven track record of customer-centric excellence in Assam.
          </h2>
          
          {/* Divider */}
          <div className="w-full mt-[28px] mb-[28px]" style={{ height: '1px', backgroundColor: '#D0CBC4' }} />
          
          {/* Paragraph */}
          <p
            className="text-[15px] leading-[1.7] text-[#888888] max-w-[520px]"
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}
          >
            At Sukrit Infrastructure Pvt Ltd, we take pride in our uncompromising integrity in customer engagement, quality assurance, and our deep commitment to building lasting communities across Assam.
          </p>
          
          {/* Read More Link */}
          <a
            href="#legacy"
            className="inline-block mt-10 text-[14px] italic underline hover:text-[#B8963E] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#1a1a1a', textDecoration: 'underline' }}
          >
            Read More
          </a>
        </div>

        {/* Right Column - 45% width */}
        <div className="lg:col-span-5 reveal">
          <div
            className="relative p-8 md:p-16 lg:p-20 w-full"
            style={{
              border: '1px solid #C8C3BC',
              backgroundColor: 'transparent',
              borderRadius: '0',
              marginTop: '0',
            }}
          >
            {/* Diagonal Slash */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: '50%',
                background: '#C8C3BC',
                transform: 'rotate(-35deg)',
                transformOrigin: 'center',
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* STAT 1 - Top Left */}
              <div className="text-left">
                <div
                  className="font-serif text-[56px] md:text-[88px] font-normal leading-none text-[#1a1a1a]"
                  style={{ fontFamily: 'Playfair Display, Cormorant Garamond, serif' }}
                >
                  {count1}<span className="text-[#B8963E]">+</span>
                </div>
                <div
                  className="mt-4 text-[13px] text-[#888888] leading-[1.5]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  years of trusted<br />growth and legacy
                </div>
              </div>

              {/* STAT 2 - Bottom Right */}
              <div className="text-right mt-auto">
                <div
                  className="font-serif text-[56px] md:text-[88px] font-normal leading-none text-[#1a1a1a]"
                  style={{ fontFamily: 'Playfair Display, Cormorant Garamond, serif' }}
                >
                  {count2}<span className="text-[#B8963E]">+</span>
                </div>
                <div
                  className="mt-4 text-[13px] text-[#888888] leading-[1.5]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  projects<br />successfully delivered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Announcements Bar */}
      <div className="max-w-[1440px] mx-auto mt-[60px] pt-5" style={{ borderTop: '1px solid #E0DBD5' }}>
        <div className="flex flex-col lg:flex-row items-center gap-6 reveal">
          {/* Black Badge */}
          <a
            href="#contact"
            className="px-6 py-[14px] hover:bg-[#B8963E] transition-colors duration-300 block text-center"
            style={{
              backgroundColor: '#111111',
              borderRadius: '0',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <span
              className="text-[13px] uppercase tracking-[0.08em]"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
              }}
            >
              Corporate Announcements to Start Your Project
            </span>
          </a>

          {/* Scrolling Ticker */}
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <div
              className="inline-block animate-marquee"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: '#555555',
                animation: 'marquee 40s linear infinite',
              }}
            >
              <span className="mx-8">In-principle approval granted for Sector 5, Guwahati Township Project</span>
              <span className="mx-8">•</span>
              <span className="mx-8">Environmental Clearance received for Sukrit Greens Phase II, Jorhat</span>
              <span className="mx-8">•</span>
              <span className="mx-8">New residential launch announced for Dibrugarh — Sukrit Elite</span>
              <span className="mx-8">•</span>
              <span className="mx-8">In-principle approval granted for Sector 5, Guwahati Township Project</span>
              <span className="mx-8">•</span>
              <span className="mx-8">Environmental Clearance received for Sukrit Greens Phase II, Jorhat</span>
              <span className="mx-8">•</span>
              <span className="mx-8">New residential launch announced for Dibrugarh — Sukrit Elite</span>
              <span className="mx-8">•</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}
