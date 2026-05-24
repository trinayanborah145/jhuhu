import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/projects/g4-jorhat")({
  component: G4Jorhat,
  head: () => ({
    meta: [
      { title: "G+4 Commercial Complex Jorhat — Sukrit Infrastructure Pvt Ltd" },
      {
        name: "description",
        content: "Premium G+4 commercial complex project in Jorhat Town by Sukrit Infrastructure.",
      },
    ],
  }),
});

function G4Jorhat() {
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
        name="G+4 Commercial Complex"
        location="Jorhat Town"
        type="Commercial"
        status="Ongoing"
      />
      <Footer />
    </>
  );
}
