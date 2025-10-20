"use client";
import React from "react";

const AnimatedCloudBackground = () => {
  return (
    <>
      <style jsx>{`
        @keyframes cloud-sweep {
          0% {
            left: -8%;
          }
          50% {
            left: 80%;
          }
          100% {
            left: -8%;
          }
        }

        .sweep-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .sweep-gradient {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: radial-gradient(
            ellipse 100% 100% at 50% 50%,
            rgba(96, 165, 250, 0.28) 0%,
            rgba(59, 130, 246, 0.2) 25%,
            rgba(147, 197, 253, 0.12) 50%,
            rgba(191, 219, 254, 0.06) 75%,
            transparent 100%
          );
          filter: blur(80px);
          animation: cloud-sweep 12s ease-in-out infinite;
          will-change: left;
        }

        @media (max-width: 1024px) {
          .sweep-gradient {
            width: 80%;
            filter: blur(70px);
          }
        }

        @media (max-width: 768px) {
          .sweep-gradient {
            width: 80%;
            filter: blur(60px);
          }

          @keyframes cloud-sweep {
            0% {
              left: -40%;
            }
            50% {
              left: 60%;
            }
            100% {
              left: -40%;
            }
          }
        }

        @media (max-width: 480px) {
          .sweep-gradient {
            width: 100%;
            filter: blur(50px);
          }

          @keyframes cloud-sweep {
            0% {
              left: -50%;
            }
            50% {
              left: 50%;
            }
            100% {
              left: -50%;
            }
          }
        }
      `}</style>

      <div className="sweep-wrapper z-0">
        <div className="sweep-gradient" />
      </div>
    </>
  );
};

export default AnimatedCloudBackground;
