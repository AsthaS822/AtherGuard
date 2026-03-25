import React, { useEffect, useRef } from "react";
import paintSplashVideo from "../animations/purplepaintsplash.mp4";

const ScrollSplashTransition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger video play when the user scrolls down a bit
      if (window.scrollY > 300 && videoRef.current) {
        // Play only if it's paused to avoid interrupting a playing video
        if (videoRef.current.paused) {
           videoRef.current.play().catch(console.error);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black -mt-32 z-10">
      <video
        ref={videoRef}
        src={paintSplashVideo}
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen scale-110"
      />
      
      {/* Dark overlay gradients to smoothly blend with sections above and below */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

export default ScrollSplashTransition;
