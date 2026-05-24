import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/g1-koronga")({
  component: G1Koronga,
  head: () => ({
    meta: [
      { title: "G+1 Building Koronga — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium G+1 residential construction project in Koronga by Sukrit Infrastructure.",
      },
    ],
  }),
});

function G1Koronga() {
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
        name="G+1 Building"
        location="Koronga"
        type="Residential"
        status="Ongoing"
      />
      <Footer />
    </>
  );
}
