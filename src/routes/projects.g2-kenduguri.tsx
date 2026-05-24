import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/g2-kenduguri")({
  component: G2Kenduguri,
  head: () => ({
    meta: [
      { title: "G+2 Building Kenduguri — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium G+2 residential construction project in Kenduguri by Sukrit Infrastructure.",
      },
    ],
  }),
});

function G2Kenduguri() {
  useSmoothScroll();
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <ProjectDetail
        name="G+2 Building"
        location="Kenduguri"
        type="Residential"
        status="Ongoing"
      />
      <Footer />
    </>
  );
}
