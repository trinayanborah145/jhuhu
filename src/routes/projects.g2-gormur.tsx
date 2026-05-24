import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/g2-gormur")({
  component: G2Gormur,
  head: () => ({
    meta: [
      { title: "G+2 Project Gormur — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium G+2 residential construction project in Gormur by Sukrit Infrastructure.",
      },
    ],
  }),
});

function G2Gormur() {
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
        name="G+2 Project"
        location="Gormur"
        type="Residential"
        status="Ongoing"
        images={["/IMG-20260522-WA0099.jpg"]}
      />
      <Footer />
    </>
  );
}
