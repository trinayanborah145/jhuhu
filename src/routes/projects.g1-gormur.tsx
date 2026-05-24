import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/g1-gormur")({
  component: G1Gormur,
  head: () => ({
    meta: [
      { title: "G+1 Projects Gormur — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium G+1 residential construction project in Gormur by Sukrit Infrastructure.",
      },
    ],
  }),
});

function G1Gormur() {
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
        name="G+1 Projects"
        location="Gormur"
        type="Residential"
        status="Ongoing"
      />
      <Footer />
    </>
  );
}
