import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
} 

export function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setLoaded(true);

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player('hero-video-player', {
        videoId: 'QURvgXoaIxM',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: 'QURvgXoaIxM',
          controls: 0,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          autohide: 1,
          playsinline: 1
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
            if (event.target.setPlaybackQuality) {
              event.target.setPlaybackQuality('hd1080');
            }
          },
          onStateChange: (event: any) => {
            if (event.data === (window.YT?.PlayerState?.ENDED || 0)) {
              event.target.playVideo();
            }
            // Ensure quality on play
            if (event.data === (window.YT?.PlayerState?.PLAYING || 1)) {
              if (event.target.setPlaybackQuality) {
                event.target.setPlaybackQuality('hd1080');
              }
            }
          }
        }
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[var(--charcoal)]">
      <div ref={bgRef} className="absolute inset-0">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            id="hero-video-player"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 'max(100vw, 177.78vh)',
              height: 'max(100vh, 56.25vw)',
              minWidth: '100%',
              minHeight: '100%',
              pointerEvents: 'none'
            }}
          ></div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1440px] mx-auto px-6 lg:px-[8%]">
        <div
          className="eyebrow eyebrow-line text-[var(--gold)] mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 0.8s",
          }}
        >
          Est. 1996 · Assam, India
        </div>

        <h1 className="font-display text-white text-[44px] sm:text-[60px] lg:text-[88px] leading-[1.05] font-normal max-w-[900px]">
          <span className={`line-mask ${loaded ? "is-visible" : ""}`}>
            <span style={{ transitionDelay: "0.4s" }}>A World Where</span>
          </span>
          <span className={`line-mask ${loaded ? "is-visible" : ""}`}>
            <span style={{ transitionDelay: "0.6s" }}>Legacy Meets Vision.</span>
          </span>
        </h1>

        <p
          className="mt-8 text-[#efefef] font-light text-[16px] lg:text-[18px] max-w-[480px] leading-relaxed"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 1.1s",
          }}
        >
          Crafting landmark spaces across Assam with uncompromising quality and timeless design.
        </p>

        <div
          className="mt-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 1.3s",
          }}
        >
          <a href="#projects" className="btn-light">
            Explore Our Projects <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
