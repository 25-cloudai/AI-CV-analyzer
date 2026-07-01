import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CVMind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  const next = new URLSearchParams(location.search).get("next");

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate(next || "/");
    }
  }, [auth?.isAuthenticated, next, navigate]);

  return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />

        <section className="main-section">
          <div className="page-heading py-16">
            <h1>Track Your Applications & Resume Ratings</h1>
            <h2>Review your submissions and check AI-powered feedback.</h2>
          </div>

          {resumes?.length > 0 && (
              <div className="resumes-section">
                {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
          )}
        </section>
      </main>
  );
}