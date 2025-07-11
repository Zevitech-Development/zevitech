"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoadingPage from "../extras/loading-page";

import { FaCheckCircle } from "react-icons/fa";

function ThankyouPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkSubmissionStatus = () => {
      try {
        const submitted = sessionStorage.getItem("form_submitted");
        const timestamp = sessionStorage.getItem("submission_timestamp");

        if (submitted === "true" && timestamp) {
          const submissionTime = parseInt(timestamp);
          const currentTime = Date.now();
          const timeDifference = currentTime - submissionTime;

          const maxValidTime = 24 * 60 * 60 * 1000;

          if (timeDifference <= maxValidTime) {
            setIsAuthorized(true);
          } else {
            sessionStorage.removeItem("form_submitted");
            sessionStorage.removeItem("submission_timestamp");
            redirectToForm();
          }
        } else {
          redirectToForm();
        }
      } catch (error) {
        console.error("Session check error:", error);
        redirectToForm();
      } finally {
        setIsLoading(false);
      }
    };

    const redirectToForm = () => {
      setTimeout(() => {
        router.replace("/");
      }, 100);
    };

    checkSubmissionStatus();
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("form_submitted");
      sessionStorage.removeItem("submission_timestamp");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="w-full h-svh bg-pattern">
      <section className="layout-standard flex-center h-full flex flex-col justify-center items-center gap-10 px-4">
        <div className="flex flex-col items-center gap-8 ">
          <FaCheckCircle className="text-green-500" size={60} />
          <div className="text-center flex flex-col items-center gap-2">
            <h1 className="lg:text-5xl md:text-4xl text-2xl leading-none text-white font-heading tracking-widest font-bold mb-4">
              Thank you for getting in touch!
            </h1>
            <h2 className="lg:text-xl md:text-lg text-base !leading-[135%] text-white/80 font-libre font-bold">
              Your request has been successfully submitted.
            </h2>
          </div>
        </div>
        <p className="md:text-base text-sm text-center max-w-6xl text-white/80">
          We&apos;ve received your request and our team is already reviewing your
          submission. Whether it&apos;s a mobile app, SaaS platform, custom website,
          or a full-scale digital solution — we&apos;re excited to collaborate with
          you. Expect a detailed response and next steps from our experts within
          the next 24 hours. Your project journey with Zevitech starts now.
        </p>

        <div className="bg-card p-6 rounded-lg">
          <h2 className="text-xl text-black mb-2 font-libre font-bold">
            What&apos;s Next?
          </h2>
          <ul className="text-primary text-left space-y-2">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              Our developing specialist will review your requirements
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              You&apos;ll receive a personalized consultation call within 24
              hours
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              We&apos;ll provide you with a customized plan
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default ThankyouPage;
