import { useEffect, useRef, useState } from "react";

export function DirectorsMessage() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    if (window.innerWidth <= 768) {
      setFlippedCard(flippedCard === index ? null : index);
    }
  };

  const directors = [
    {
      id: 1,
      badge: "DIRECTOR 1",
      photo: "/directors/director-2.jpg",
      name: "Ajay Yadav",
      title: "Managing Director",
      message: "Building Assam's future is not just our business — it is our deepest responsibility. Every brick we lay carries the trust of a family, and that drives everything we do at Sukrit Infrastructure Pvt Ltd.",
      grayscale: false,
    },
    {
      id: 2,
      badge: "DIRECTOR 2",
      photo: "/directors/director-1.jpg",
      name: "Bikram Yadav",
      title: "Director — Operations",
      message: "Our commitment to quality is unwavering. We believe that excellence in construction is not an option — it is the only standard we accept. Assam deserves world-class infrastructure.",
      grayscale: false,
    },
    {
      id: 3,
      badge: "DIRECTOR 3",
      photo: "/directors/director-3.jpg",
      name: "Abhay Yadav",
      title: "Director — Projects",
      message: "Innovation and sustainability are at the heart of every project we undertake. We are not just constructing buildings — we are crafting the legacy of a better, stronger, greener Assam for generations.",
      grayscale: false,
    }
  ];

  return (
    <section id="directors-message" ref={sectionRef} className="directors-section">
      <style dangerouslySetInnerHTML={{
        __html: `
        .directors-section {
          background-color: #F8F5F0;
          padding: 100px 0;
          overflow: hidden;
        }

        .animate-on-scroll {
          opacity: 0;
          transition: all 0.8s ease;
        }

        .animate-on-scroll.header {
          transform: translateY(28px);
          transition-duration: 0.9s;
          transition-delay: 0s;
        }

        .animate-on-scroll.card-0 {
          transform: translateY(40px);
          transition-duration: 0.8s;
          transition-delay: 0.2s;
        }

        .animate-on-scroll.card-1 {
          transform: translateY(40px);
          transition-duration: 0.8s;
          transition-delay: 0.35s;
        }

        .animate-on-scroll.card-2 {
          transform: translateY(40px);
          transition-duration: 0.8s;
          transition-delay: 0.5s;
        }

        .animate-on-scroll.stats {
          transform: translateY(20px);
          transition-duration: 0.7s;
          transition-delay: 0.65s;
        }

        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .flip-card-container {
          display: flex;
          justify-content: center;
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .flip-card {
          perspective: 1200px;
          position: relative;
          width: 320px;
          height: 420px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.85s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
        }

        .flip-card.mobile-flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          background: #1C1C1C;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .front-card-top {
          width: 100%;
          height: 70%;
          position: relative;
        }

        .front-card-top img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: filter 0.4s ease;
        }

        .front-card-bottom {
          height: 30%;
          background: #FFFFFF;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
        }

        .director-img-gray {
          filter: grayscale(100%);
        }

        @media (hover: hover) and (pointer: fine) {
          .flip-card:hover .director-img-gray {
            filter: grayscale(0%);
          }
        }

        .center-elevated {
          transform: translateY(-20px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.12);
        }

        .stats-bar-container {
          max-width: 700px;
          margin: 80px auto 0 auto;
          padding-top: 40px;
          border-top: 1px solid #E2DDD8;
          display: flex;
          justify-content: center;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .stats-left {
          padding-right: 48px;
        }

        .stat-divider {
          border-left: 1px solid #E2DDD8;
          padding-left: 48px;
        }

        .mobile-tap-hint {
          display: none;
        }

        @media (max-width: 768px) {
          .directors-section h2 {
            font-size: 38px !important;
          }
          .flip-card-container {
            flex-direction: column;
            align-items: center;
          }
          .flip-card {
            width: 90vw;
            height: 380px;
          }
          .center-elevated {
            transform: none;
            box-shadow: none;
          }
          .stats-bar-container {
            flex-direction: column;
            align-items: center;
            gap: 32px;
            text-align: center;
            border-top: none;
            padding-top: 0;
            margin-top: 60px;
          }
          .stats-left {
            padding-right: 0;
          }
          .stat-divider {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid #E2DDD8;
            padding-top: 32px;
            width: 80%;
          }
          .director-img-gray {
            filter: grayscale(0%);
          }
          .mobile-tap-hint {
            display: block;
            position: absolute;
            bottom: 8px;
            left: 0;
            right: 0;
            text-align: center;
            font-family: "DM Sans", sans-serif;
            font-size: 10px;
            color: #B8963E;
            opacity: 0.8;
          }
        }
      `}} />

      <div className="mx-auto px-6" style={{ maxWidth: '1440px' }}>
        <div className="flex flex-col items-center animate-on-scroll header">
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#B8963E',
            marginBottom: '16px'
          }}>
            LEADERSHIP
          </div>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '56px',
            fontWeight: 400,
            color: '#1C1C1C',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            The Visionaries Behind<br />Sukrit Infrastructure Pvt Ltd.
          </h2>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '15px',
            color: '#888888',
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto 64px auto',
            lineHeight: 1.7
          }}>
            Meet the leaders whose vision, dedication and unwavering commitment are building Assam's tomorrow.
          </p>
        </div>

        <div className="flip-card-container">
          {directors.map((dir, index) => (
            <div
              key={dir.id}
              className={`flip-card animate-on-scroll card-${index} ${index === 1 ? 'center-elevated' : ''} ${flippedCard === index ? 'mobile-flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="flip-card-inner">
                {/* FRONT FACE */}
                <div className="flip-card-front" style={{ background: '#EFEFED', display: 'flex', flexDirection: 'column' }}>
                  <div className="front-card-top">
                    <img
                      src={dir.photo}
                      alt={dir.name}
                      className={dir.grayscale ? 'director-img-gray' : ''}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: '#FFFFFF',
                      borderRadius: '50px',
                      padding: '6px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B8963E' }}></div>
                      <div style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#1C1C1C',
                        letterSpacing: '0.05em'
                      }}>
                        {dir.badge}
                      </div>
                    </div>
                  </div>
                  <div className="front-card-bottom" style={{ position: 'relative' }}>
                    <div style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '24px',
                      fontWeight: 500,
                      color: '#1C1C1C'
                    }}>
                      {dir.name}
                    </div>
                    <div style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: '#B8963E',
                      marginTop: '6px'
                    }}>
                      {dir.title}
                    </div>
                    <div style={{ position: 'absolute', bottom: '20px', right: '24px', color: '#B8963E', fontSize: '16px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    <div className="mobile-tap-hint">
                      TAP TO READ MESSAGE
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="flip-card-back">
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '120px',
                      fontWeight: 400,
                      color: 'rgba(184, 150, 62, 0.15)',
                      position: 'absolute',
                      top: '-10px',
                      left: '24px',
                      lineHeight: 1,
                      pointerEvents: 'none'
                    }}>
                      "
                    </div>
                    <div style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '20px',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: '#EFEFEF',
                      lineHeight: 1.65,
                      position: 'relative',
                      zIndex: 1,
                      marginTop: '32px'
                    }}>
                      {dir.message}
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '40px', height: '1px', background: '#B8963E', marginBottom: '14px' }}></div>
                    <div style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#FFFFFF',
                      letterSpacing: '0.05em'
                    }}>
                      {dir.name}
                    </div>
                    <div style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: '#B8963E',
                      marginTop: '4px'
                    }}>
                      {dir.title}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '40px',
                      height: '40px',
                      border: '2px solid #B8963E',
                      borderRadius: '50%',
                      overflow: 'hidden'
                    }}>
                      <img src={dir.photo} alt={dir.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-bar-container animate-on-scroll stats">
          <div className="stat-item stats-left">
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#888888',
              lineHeight: 1.5
            }}>
              TRUSTED BY FAMILIES<br />ACROSS ASSAM
            </div>
          </div>
          <div className="stat-item stat-divider">
            <div style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '48px',
              fontWeight: 400,
              color: '#1C1C1C',
              lineHeight: 1
            }}>
              200+
            </div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '12px',
              color: '#888888',
              marginTop: '4px'
            }}>
              Projects Delivered
            </div>
          </div>
          <div className="stat-item stat-divider">
            <div style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '48px',
              fontWeight: 400,
              color: '#1C1C1C',
              lineHeight: 1
            }}>
              30+
            </div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '12px',
              color: '#888888',
              marginTop: '4px'
            }}>
              Years of Excellence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
