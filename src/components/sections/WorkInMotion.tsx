import { useEffect, useRef, useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/sukrit.infrastructure/";

const videos = [
  {
    src: "/AQNGhlsMYSv4nvhqXGyg0vRIvsZs670WDT5oX6vNYzrniRamsjCWFs9Yj56j5yUVs706oodo9dDM-CgbLIEw3k6P.mp4",
    title: "Sukrit Heights",
    location: "Guwahati",
    status: "Ongoing",
    details: "3 & 4 BHK",
    badge: "🎬 Site Visit",
  },
  {
    src: "/AQN4MtqsRIpP9Lz-UiIgALALt_pp6OwGbkiK8o0zlCvWV-jTtPam93UE7qsZXEImCwsydpFBufd8nKrFa1SqOBsw_0GtT_Gob8D_oz4.mp4",
    title: "Sukrit Greens",
    location: "Jorhat",
    status: "Under Construction",
    details: "2 & 3 BHK",
    badge: "🏗 Construction",
  },
  {
    src: "/AQOsFEJK6M0eb6-t8joeMMDHNlTlyPKRBl86ndNaw7-kdaYjD9l4TenhNpXKVDj5JLvmmvZLEycnXzYAaDmeI1zF.mp4",
    title: "Sukrit Elite",
    location: "Dibrugarh",
    status: "Foundation Stage",
    details: "4 BHK Luxury",
    badge: "🏗 Construction",
  },
  {
    src: "/AQP30-34Vl8VxMaqdQnAVLJnaMOLT0SdoYvWAacwj-gHpKe2NtMIic75zbSjcOMPWPs7FPGs6sOZDR9e8yaB8sAsmqgCpEBP7q-kByM.mp4",
    title: "Sukrit Business Park",
    location: "Guwahati",
    status: "Commercial",
    details: "Offices & Retail",
    badge: "🎬 Site Visit",
  },
  {
    src: "/AQPRKeNVaKOiA89NxuYYwc5P41nlXljAlKzWrk-Z1k5MYKMCFPegs03YDu0R7RAGOzPcQuiA-ccwUxeL7IID1NsE.mp4",
    title: "Sukrit Meadows",
    location: "Silchar",
    status: "Planning Stage",
    details: "2 & 3 BHK",
    badge: "📋 Planning",
  },
];

// Preload videos
videos.forEach((video) => {
  const videoEl = document.createElement('video');
  videoEl.src = video.src;
  videoEl.preload = 'auto';
});

export function WorkInMotion() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      autoRotateRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % videos.length);
      }, 5000);
    }

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [isPaused]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + videos.length) % videos.length) - Math.floor(videos.length / 2);

    if (normalizedDiff === 0) {
      return {
        transform: "translateX(0px) rotate(0deg) scale(1.0)",
        opacity: 1,
        filter: "grayscale(0%) brightness(1)",
        zIndex: 10,
        boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
        outline: "2px solid rgba(184,150,62,0.4)",
      };
    } else if (normalizedDiff === -1 || normalizedDiff === 4) {
      return {
        transform: "translateX(-200px) rotate(-12deg) scale(0.84)",
        opacity: 0.65,
        filter: "grayscale(35%) brightness(0.9)",
        zIndex: 2,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -4) {
      return {
        transform: "translateX(200px) rotate(12deg) scale(0.84)",
        opacity: 0.65,
        filter: "grayscale(35%) brightness(0.9)",
        zIndex: 2,
      };
    } else if (normalizedDiff === -2 || normalizedDiff === 3) {
      return {
        transform: "translateX(-400px) rotate(-24deg) scale(0.72)",
        opacity: 0.45,
        filter: "grayscale(70%) brightness(0.8)",
        zIndex: 1,
      };
    } else if (normalizedDiff === 2 || normalizedDiff === -3) {
      return {
        transform: "translateX(400px) rotate(24deg) scale(0.72)",
        opacity: 0.45,
        filter: "grayscale(70%) brightness(0.8)",
        zIndex: 1,
      };
    }
    return {
      transform: "translateX(0px) rotate(0deg) scale(0.72)",
      opacity: 0,
      filter: "grayscale(100%) brightness(0.7)",
      zIndex: 0,
    };
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const handleCardClick = () => {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
  };

  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      id="our-work"
      ref={sectionRef}
      className="relative py-[80px] md:py-[120px] pb-[60px] md:pb-[100px]"
      style={{ backgroundColor: "#F8F5F0" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[8%]">
        {/* Section Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <span
            className="block text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#B8963E" }}
          >
            OUR WORK IN MOTION
          </span>
          <h2
            className="text-[36px] md:text-[56px] font-normal leading-tight mb-3"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#1C1C1C" }}
          >
            See Our Projects Come to Life
          </h2>
          <p
            className="text-[16px]"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#888888" }}
          >
            Real construction. Real progress. Captured from the ground up.
          </p>
        </div>


        {/* Fan Card Layout */}
        <div
          className="relative h-[650px] flex items-center justify-center overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.94)",
            transition: "all 1.1s cubic-bezier(0.25, 0.1, 0.25, 1) 0.35s",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={handleCardClick}
              className="absolute w-[260px] h-[380px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-gray-900"
              style={{
                ...getCardStyle(index),
                boxShadow: index === activeIndex ? "0 32px 80px rgba(0,0,0,0.28)" : "0 20px 60px rgba(0,0,0,0.18)",
              }}
            >
              <video
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.background = `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`;
                    const fallback = document.createElement('div');
                    fallback.className = 'absolute inset-0 flex items-center justify-center text-white text-center p-4';
                    fallback.innerHTML = `<div class="text-sm" style="font-family: DM Sans, sans-serif;">${video.title}<br><span class="text-xs text-gray-400">${video.location}</span></div>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
              {index === activeIndex && (
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
                    }}
                  />
                  {/* Instagram tap hint */}
                  <div
                    className="absolute top-5 right-5 z-[100] flex items-center gap-2 px-3 py-2 rounded-full"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "10px", color: "white", letterSpacing: "0.1em", textTransform: "uppercase" }}>View on Instagram</span>
                  </div>
                  <div className="relative p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className="px-2.5 py-1 rounded text-[11px] flex items-center gap-2"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          backgroundColor: "rgba(0,0,0,0.6)",
                          color: "white",
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        LIVE
                      </span>
                      <span
                        className="px-2.5 py-1 rounded text-[11px]"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          backgroundColor: "#B8963E",
                          color: "white",
                        }}
                      >
                        {video.badge}
                      </span>
                    </div>
                    <h3
                      className="text-[16px] font-semibold text-white mb-1"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {video.title}, {video.location}
                    </h3>
                    <p
                      className="text-[12px]"
                      style={{ fontFamily: "DM Sans, sans-serif", color: "#CCCCCC" }}
                    >
                      2024  •  {video.status}  •  {video.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-[#C8C3BC] bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-[#B8963E] hover:border-[#B8963E] group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1C1C1C] group-hover:text-white transition-colors"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-[#C8C3BC] bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-[#B8963E] hover:border-[#B8963E] group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1C1C1C] group-hover:text-white transition-colors"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </section>
  );
}
