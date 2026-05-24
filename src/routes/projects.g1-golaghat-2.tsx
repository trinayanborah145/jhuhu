import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/g1-golaghat-2")({
  component: G1Golaghat2,
  head: () => ({
    meta: [
      { title: "G+1 Building Golaghat 2 — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium G+1 residential construction project in Golaghat by Sukrit Infrastructure.",
      },
    ],
  }),
});

function G1Golaghat2() {
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
        location="Golaghat"
        type="Residential"
        status="Ongoing"
        images={["/IMG-20260513-WA0044.jpg"]}
      />
      <Footer />
    </>
  );
}
