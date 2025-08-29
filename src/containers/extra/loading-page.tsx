import React from "react";

function LoadingPage() {
  return (
    <main className="w-full h-screen flex-center bg-background">
      <div
        className="w-[100px] h-[100px] relative block"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-20deg)",
        }}
      >
        <div
          className="relative w-full h-full animate-spinY"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateZ(-45deg) rotateY(90deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateZ(45deg) rotateY(90deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateX(45deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateX(-45deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)] top-[148%]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateZ(-45deg) rotateY(90deg) rotateX(180deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)] top-[148%]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateZ(45deg) rotateY(90deg) rotateX(180deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)] top-[148%]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateX(45deg) rotateX(180deg)",
            }}
          />
          <span
            className="absolute inset-0 m-auto w-full h-[calc(100%*167/240)] top-[148%]"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transformOrigin: "center top",
              background:
                "conic-gradient(from 0deg, #66b7ff, #007afc, #005bb8, #66b7ff)",
              transform: "rotateX(-45deg) rotateX(180deg)",
            }}
          />

          <span
            className="absolute m-auto w-[66%] h-[66%] top-[55%] left-0 right-0 bottom-0 bg-[#007afc] blur-[20px]"
            style={{
              transform: "rotateX(90deg) translateZ(-40px)",
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default LoadingPage;
