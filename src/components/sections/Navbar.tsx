import { useEffect, useState, useRef } from "react";
import { Menu, X, X as CloseIcon } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { label: "Our Legacy", to: "/", hash: "legacy" },
  { label: "Projects", to: "/projects" },
  { label: "Vision", to: "/", hash: "vision" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);
  const [menuAnimationState, setMenuAnimationState] = useState<"closed" | "entering" | "visible" | "exiting">("closed");
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(84);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const showScrolled = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setNavHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const openProjectsMenu = () => {
    setIsProjectsMenuOpen(true);
    setMenuAnimationState("entering");
    setTimeout(() => setMenuAnimationState("visible"), 50);
  };

  const closeProjectsMenu = () => {
    setMenuAnimationState("exiting");
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setIsProjectsMenuOpen(false);
      setMenuAnimationState("closed");
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isProjectsMenuOpen
            ? "menu-open"
            : showScrolled
            ? "bg-[rgba(248,245,240,0.92)] backdrop-blur-md border-b border-[var(--divider)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          animation: "fadeDown 0.8s ease 0.3s both",
          zIndex: 10000,
        }}
      >
        <style>{`
          @keyframes fadeDown {
            from { opacity:0; transform:translateY(-20px);}
            to {opacity:1; transform:translateY(0);}
          }
          @keyframes underlineSlide {
            from { transform: scaleX(0); transform-origin: left; }
            to { transform: scaleX(1); transform-origin: left; }
          }
          .menu-open {
            background: rgba(15, 13, 11, 0.98) !important;
            backdrop-filter: blur(0px) !important;
          }
        `}</style>
        <div className="max-w-[1440px] mx-auto px-6 lg:pl-12 lg:pr-4 h-[84px] flex items-center justify-between">
          <Link
            to="/"
            className="font-display uppercase text-[14px] sm:text-[16px] lg:text-[18px] font-medium transition-colors flex-shrink-0"
            style={{
              letterSpacing: "0.16em",
              color: isProjectsMenuOpen ? "white" : showScrolled ? "var(--text-soft)" : "white"
            }}
          >
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[16px] lg:text-[18px] block font-medium whitespace-nowrap">SUKRIT INFRASTRUCTURE PVT LTD</span>
              <span className="text-[8px] sm:text-[9px] font-sans font-normal tracking-[0.05em] sm:tracking-[0.1em] opacity-60 mt-0.5 whitespace-nowrap" style={{ textTransform: "none" }}>
                CIN U41001AS2026PTC029861 <span className="hidden sm:inline">| UNIT OF AB GROUP</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-14 ml-20 xl:ml-32 flex-shrink-0">
            {links.map((l) => (
              <div key={l.label} className="relative">
                {l.label === "Projects" ? (
                  <>
                    <Link
                      to="/projects"
                      onMouseEnter={openProjectsMenu}
                      className="text-[12px] font-medium uppercase transition-colors hover:text-[var(--gold)] relative"
                      style={{
                        letterSpacing: "0.18em",
                        color: isProjectsMenuOpen ? "rgba(255,255,255,0.9)" : showScrolled ? "var(--text-soft)" : "rgba(255,255,255,0.9)"
                      }}
                    >
                      {l.label}
                      {isProjectsMenuOpen && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-px bg-white"
                          style={{
                            animation: "underlineSlide 0.25s ease forwards",
                          }}
                        />
                      )}
                    </Link>
                  </>
                ) : (
                  <Link
                    to={l.to}
                    hash={l.hash}
                    className="text-[12px] font-medium uppercase transition-colors hover:text-[var(--gold)] relative group"
                    style={{
                      letterSpacing: "0.18em",
                      color: isProjectsMenuOpen ? "rgba(255,255,255,0.9)" : showScrolled ? "var(--text-soft)" : "rgba(255,255,255,0.9)"
                    }}
                  >
                    {l.label}
                    <span
                      className="absolute bottom-0 left-0 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left"
                      style={{ width: "100%" }}
                    />
                  </Link>
                )}
              </div>
            ))}
            <a
              href={`https://wa.me/919101002790?text=${encodeURIComponent(
                "Hello Sukrit Infrastructure,\n\nI would like to enquire about your residential construction projects and services.\n\nCould you please guide me on your ongoing projects, available locations, and how we can get started?\n\nThank you!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-gold !py-3 !px-6 ${showScrolled ? "" : "!text-white !border-white/70"}`}
            >
              Enquire Now
            </a>
          </nav>

          <div className="flex items-center lg:hidden shrink-0" style={{ zIndex: 10001 }}>
            <button
              onClick={() => setOpen(true)}
              className="p-2 -mr-2 flex items-center justify-center transition-all"
              style={{ color: showScrolled ? "var(--text-soft)" : "white" }}
              aria-label="Open menu"
            >
              <Menu size={30} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-[var(--charcoal)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 100000 }}
      >
        <div className="flex justify-between items-center px-6 h-[84px]">
          <span className="font-display text-white uppercase text-[16px]" style={{ letterSpacing: "0.16em" }}>
            Sukrit
          </span>
          <button onClick={() => setOpen(false)} className="text-white" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-8 px-8 pt-16">
          {links.map((l, i) => (
            <div key={l.label}>
              {l.label === "Projects" ? (
                <div>
                  <div className="flex items-center gap-4">
                    <Link
                      to="/projects"
                      onClick={() => setOpen(false)}
                      className="font-display text-white text-4xl"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "translateY(0)" : "translateY(20px)",
                        transition: `all 0.6s ease ${i * 0.1 + 0.2}s`,
                      }}
                    >
                      {l.label}
                    </Link>
                    <button
                      onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                      className="font-display text-white text-4xl"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "translateY(0)" : "translateY(20px)",
                        transition: `all 0.6s ease ${i * 0.1 + 0.2}s`,
                      }}
                    >
                      <span className={`transform transition-transform duration-300 ${mobileProjectsOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-350 ease"
                    style={{
                      maxHeight: mobileProjectsOpen ? "1000px" : "0",
                    }}
                  >
                    <div className="pt-4 pb-2 px-4 space-y-4">
                      <div>
                        <h4 className="text-white text-lg font-serif mb-3" style={{ fontFamily: "Playfair Display, Cormorant Garamond, serif" }}>Our Projects</h4>
                        <div className="space-y-2">
                          {[
                            { name: "G+1 Projects", location: "Gormur", route: "/projects/g1-gormur" },
                            { name: "G+2 Project", location: "Gormur", route: "/projects/g2-gormur" },
                            { name: "G+2 Building", location: "Dohabara", route: "/projects/g2-dohabara" },
                            { name: "G+1 Building", location: "Golaghat", route: "/projects/g1-golaghat" },
                            { name: "G+2 Building", location: "Kenduguri", route: "/projects/g2-kenduguri" },
                            { name: "G+1 Building", location: "Koronga", route: "/projects/g1-koronga" },
                            { name: "G+2 Building", location: "Macharhat", route: "/projects/g2-macharhat" },
                            { name: "G+4 Commercial Complex", location: "Jorhat Town", route: "/projects/g4-jorhat" },
                            { name: "Assam Type House", location: "Lichubari", route: "/projects/assam-type-lichubari" },
                            { name: "G+2 Building", location: "Garmur", route: "/projects/g2-garmur" },
                          ].map((project) => (
                            <Link key={project.name} to={project.route as any} onClick={() => setOpen(false)} className="block text-white/80 hover:text-[#B8963E] transition-colors text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                              {project.name} - {project.location}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={l.to}
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className="font-display text-white text-4xl"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s ease ${i * 0.1 + 0.2}s`,
                  }}
                >
                  {l.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Projects Mega Menu */}
      {isProjectsMenuOpen && (
        <>
          <div
            className="fixed left-0 right-0 bottom-0 z-[9998]"
            style={{
              top: `${navHeight}px`,
              backgroundColor: "rgba(20, 18, 16, 0.96)",
              backdropFilter: "blur(4px)",
              opacity: menuAnimationState === "closed" ? 0 : menuAnimationState === "entering" ? 0 : menuAnimationState === "exiting" ? 0 : 1,
              transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            onClick={closeProjectsMenu}
          />
          <div
            className="fixed left-0 right-0 z-[9999]"
            onMouseLeave={closeProjectsMenu}
            style={{
              top: `${navHeight}px`,
              opacity: menuAnimationState === "closed" ? 0 : menuAnimationState === "entering" ? 0 : menuAnimationState === "exiting" ? 0 : 1,
              transform: menuAnimationState === "entering" ? "translateY(-12px)" : menuAnimationState === "exiting" ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <div
              className="px-[8%] py-12 pb-14"
              style={{
                opacity: menuAnimationState === "closed" ? 0 : 1,
              }}
            >
              <div className="grid grid-cols-1 gap-8 relative max-w-4xl mx-auto">
                {/* Close Button */}
                <button
                  onClick={closeProjectsMenu}
                  className="absolute -top-4 right-0 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all"
                  style={{ width: "36px", height: "36px" }}
                >
                  <CloseIcon size={16} className="text-white" />
                </button>

                {/* Our Projects Section */}
                <div
                  style={{
                    opacity: menuAnimationState === "visible" ? 1 : 0,
                    transform: menuAnimationState === "visible" ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s, transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s",
                  }}
                >
                  <h3
                    className="font-serif text-[28px] font-normal text-white mb-8"
                    style={{ fontFamily: "Playfair Display, Cormorant Garamond, serif" }}
                  >
                    Our Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "G+1 Projects", location: "Gormur", route: "/projects/g1-gormur" },
                      { name: "G+2 Project", location: "Gormur", route: "/projects/g2-gormur" },
                      { name: "G+2 Building", location: "Dohabara", route: "/projects/g2-dohabara" },
                      { name: "G+1 Building", location: "Golaghat", route: "/projects/g1-golaghat" },
                      { name: "G+2 Building", location: "Kenduguri", route: "/projects/g2-kenduguri" },
                      { name: "G+1 Building", location: "Koronga", route: "/projects/g1-koronga" },
                      { name: "G+2 Building", location: "Macharhat", route: "/projects/g2-macharhat" },
                      { name: "G+4 Commercial Complex", location: "Jorhat Town", route: "/projects/g4-jorhat" },
                      { name: "Assam Type House", location: "Lichubari", route: "/projects/assam-type-lichubari" },
                      { name: "G+2 Building", location: "Garmur", route: "/projects/g2-garmur" },
                    ].map((project) => (
                      <Link
                        key={project.name}
                        to={project.route as any}
                        onClick={closeProjectsMenu}
                        className="group p-4 rounded-lg border border-white/10 hover:border-[#B8963E]/50 hover:bg-white/5 transition-all"
                      >
                        <div className="text-[16px] font-normal text-white group-hover:text-[#B8963E] transition-colors duration-200" style={{ fontFamily: "DM Sans, sans-serif" }}>
                          {project.name}
                        </div>
                        <div className="text-[13px] font-normal text-[#888888] mt-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
                          {project.location}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
