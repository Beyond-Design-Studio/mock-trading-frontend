import React from "react";

const Loading = (): JSX.Element => {
  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>

      <style jsx>{`
        .loader {
          animation: rotate 2s linear infinite;
        }
        
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        
        .loader circle {
          animation: dash 1.5s ease-in-out infinite;
        }
        
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>

      <svg
        className="loader"
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
};
export default Loading;
