import React, { useEffect, useRef } from "react";

const ScrollSplashTransition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-80"
      >
        <source
          src={process.env.PUBLIC_URL + "/videos/purplepaintsplash.mp4"}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default ScrollSplashTransition;
