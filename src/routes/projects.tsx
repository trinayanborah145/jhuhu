import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content:
          "Discover our portfolio of landmark residential and commercial developments across Assam.",
      },
    ],
  }),
});

interface Project {
  id: number;
  name: string;
  location: string;
  type: string;
  route: string;
  image?: string;
}

const projects: Project[] = [
  { id: 1, name: "G+1 Projects", location: "Gormur", type: "Residential", route: "/projects/g1-gormur", image: "/IMG-20260522-WA0098.jpg" },
  { id: 2, name: "G+2 Project", location: "Gormur", type: "Residential", route: "/projects/g2-gormur", image: "/IMG-20260522-WA0099.jpg" },
  { id: 3, name: "G+2 Building", location: "Dohabara", type: "Residential", route: "/projects/g2-dohabara", image: "/IMG-20260513-WA0025 (1).jpg" },
  { id: 4, name: "G+1 Building", location: "Golaghat", type: "Residential", route: "/projects/g1-golaghat", image: "/IMG-20260513-WA0036.jpg" },
  { id: 5, name: "G+1 Building", location: "Golaghat", type: "Residential", route: "/projects/g1-golaghat-2", image: "/IMG-20260513-WA0044.jpg" },
  { id: 6, name: "G+2 Building", location: "Kenduguri", type: "Residential", route: "/projects/g2-kenduguri", image: "/IMG-20260513-WA0042 (1).jpg" },
  { id: 7, name: "G+2 Building", location: "Macharhat", type: "Residential", route: "/projects/g2-macharhat", image: "/IMG-20260513-WA0034.jpg" },
  { id: 8, name: "G+4 Commercial Complex", location: "Jorhat Town", type: "Commercial", route: "/projects/g4-jorhat", image: "/IMG-20260513-WA0038.jpg" },
  { id: 9, name: "Assam Type House", location: "Lichubari", type: "Residential", route: "/projects/assam-type-lichubari", image: "/IMG-20260513-WA0027.jpg" },
];

function Projects() {
  useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main
        className="min-h-screen"
        style={{ backgroundColor: "#F8F5F0" }}
      >
        {/* Hero Section */}
        <section
          ref={sectionRef}
          className="relative h-[60vh] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#1C1C1C" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F5F0]" />
          <div className="relative z-10 text-center px-6">
            <span
              className={`block text-[11px] uppercase tracking-[0.35em] mb-6 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                fontFamily: "DM Sans, sans-serif",
                color: "#B8963E",
                transition: "all 0.8s ease 0.2s",
              }}
            >
              Our Portfolio
            </span>
            <h1
              className={`font-display text-white ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                fontSize: "clamp(44px, 7vw, 88px)",
                fontWeight: 400,
                lineHeight: 1.05,
                transition: "all 0.8s ease 0.4s",
              }}
            >
              Our Projects
            </h1>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-6 md:px-12 lg:px-[8%]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  to={project.route as any}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transition: `all 0.6s ease ${index * 0.1}s`,
                  }}
                >
                  {/* Image Placeholder */}
                  <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#B8963E]/10 flex items-center justify-center"
                          >
                            <svg
                              className="w-8 h-8 text-[#B8963E]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-400 font-medium">
                            Image Placeholder
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(184,150,62,0.1)",
                          color: "#B8963E",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        {project.type}
                      </span>
                    </div>
                    <h3
                      className="font-display text-2xl text-[#1C1C1C] mb-2"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-[#888888] text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {project.location}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] font-medium transition-colors group-hover:text-[#B8963E]" style={{ fontFamily: "DM Sans, sans-serif", color: "#1C1C1C" }}>
                        View Details
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-[8%]" style={{ backgroundColor: "#1C1C1C" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="font-display text-white text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Interested in a Project?
            </h2>
            <p
              className="text-[#888888] text-lg mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Get in touch with us to learn more about our ongoing projects and
              upcoming developments across Assam.
            </p>
            <a
              href={`https://wa.me/919101002790?text=${encodeURIComponent(
                "Hi Sukrit Infrastructure, I would like to enquire about your projects."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-[12px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:gap-5"
              style={{ backgroundColor: "#25D366", fontFamily: "DM Sans, sans-serif" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
              <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
