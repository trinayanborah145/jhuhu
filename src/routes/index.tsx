import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { PropertySearch } from "@/components/sections/PropertySearch";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { LoanPartners } from "@/components/sections/LoanPartners";
import { WorkInMotion } from "@/components/sections/WorkInMotion";
import { About } from "@/components/sections/About";
import { OurServices } from "@/components/sections/OurServices";
import { BrandPartners } from "@/components/sections/BrandPartners";
import { OurGuarantee } from "@/components/sections/OurGuarantee";
import { OurPlans } from "@/components/sections/OurPlans";
import { FoundersMessage } from "@/components/sections/FoundersMessage";
import { DirectorsMessage } from "@/components/sections/DirectorsMessage";
import { ESG } from "@/components/sections/ESG";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { useRevealAll } from "@/hooks/use-reveal";
import { EnquiryPopup } from "@/components/EnquiryPopup";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sukrit Infrastructure Pvt Ltd — Building Assam's Tomorrow, Today." },
      {
        name: "description",
        content:
          "Sukrit Infrastructure Pvt Ltd crafts landmark residential and commercial spaces across Assam — 25+ years of trusted real estate development with uncompromising quality.",
      },
      { property: "og:title", content: "Sukrit Infrastructure Pvt Ltd — Luxury Real Estate in Assam" },
      {
        property: "og:description",
        content:
          "Crafting landmark spaces across Assam with uncompromising quality and timeless design.",
      },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
      },
    ],
  }),
});

function Index() {
  useRevealAll();
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <EnquiryPopup />
      <Navbar />
      <main>
        <Hero />
        <BrandStatement />
        <OurServices />
        <BrandPartners />
        <OurGuarantee />
        <OurPlans />
        <WorkInMotion />
        <Marquee />
        <FeaturedProjects />
        <PropertySearch />
        <WhyChooseUs />
        <Stats />
        <About />
        <FoundersMessage />
        <DirectorsMessage />
        <Testimonials />
        <LoanPartners />
        <ESG />
        <Contact />
      </main>
      <Footer />
      <a href="https://www.instagram.com/vertiasmedia/" target="_blank" rel="noopener noreferrer" className="side-enquire hidden lg:flex"><span className="side-line">Veritas Media</span><span className="side-line">Marketed by</span></a>
    </>
  );
}
