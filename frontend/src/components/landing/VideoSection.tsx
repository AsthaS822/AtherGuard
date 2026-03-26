import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Target, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 1.4, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-bg-main transition-colors duration-500">

      
      {/* VIDEO */}
      <div ref={ref} className="w-full h-full absolute inset-0 z-0">
        <video
          src="/videos/purplepaintsplash.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-transparent to-bg-main z-10" />

      </div>

      {/* OVERLAY CONTENT */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/50" />
            <span className="text-primary-glow font-black uppercase tracking-[0.4em] text-xs">Visual Intelligence Engine</span>
            <div className="h-px w-12 bg-primary/50" />
        </div>
        <h2 className="text-6xl md:text-[8rem] font-black font-sora text-text-primary leading-[0.8] mb-12 tracking-tighter uppercase italic">
          Pulse <br />
          <span className="text-primary">Control</span>
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mt-20">
            {[
                { icon: ShieldCheck, label: "Neural Shield" },
                { icon: Zap, label: "Live Scanning" },
                { icon: Target, label: "Precision Meta" }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 rounded-full border border-border-main flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform bg-bg-surface/10">
                        <item.icon className="text-text-primary" size={28} />
                    </div>
                    <span className="text-text-secondary font-bold uppercase tracking-widest text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</span>
                </div>

            ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none border-[40px] border-white/5 z-30" />
    </section>
  );
}
