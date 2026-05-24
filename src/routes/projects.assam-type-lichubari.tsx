import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/assam-type-lichubari")({
  component: AssamTypeLichubari,
  head: () => ({
    meta: [
      { title: "Assam Type House Lichubari — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium Assam type house construction project in Lichubari by Sukrit Infrastructure.",
      },
    ],
  }),
});

function AssamTypeLichubari() {
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
        name="Assam Type House"
        location="Lichubari"
        type="Residential"
        status="Ongoing"
      />
      <Footer />
    </>
  );
}
