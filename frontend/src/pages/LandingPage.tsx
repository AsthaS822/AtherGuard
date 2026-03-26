import React from 'react';
import LandingNavbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import VideoSection from '../components/landing/VideoSection';
import Features from '../components/landing/Features';

const LandingPage: React.FC = () => {
    return (
        <main className="bg-bg-main text-text-primary transition-colors duration-500 overflow-x-hidden">
            <LandingNavbar />
            <Hero />
            <VideoSection />
            <Features />

            {/* Final CTA */}
            <section className="py-40 px-8 text-center bg-bg-main transition-colors">
                <div className="max-w-4xl mx-auto rounded-[3rem] p-20 border border-border-dim bg-bg-surface relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                    <h2 className="text-5xl md:text-8xl font-black font-sora tracking-tighter mb-8 leading-none">
                        START <span className="text-primary italic">SHIELDING</span>
                    </h2>
                    <p className="text-xl text-text-secondary mb-12 max-w-xl mx-auto font-medium">Protect your community with AetherGuard AI today.</p>
                    <button className="px-16 py-6 rounded-3xl bg-primary text-white font-black tracking-widest uppercase shadow-[0_20px_40px_-10px_rgba(124,58,237,0.5)] hover:scale-105 transition-all">
                        Launch Agent Now
                    </button>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="py-20 px-10 border-t border-border-dim flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black tracking-widest text-text-dim">
                <p>© 2026 AETHERGUARD AI INC.</p>
                <div className="flex gap-10">
                    <a href="#" className="hover:text-primary transition-all">Twitter</a>
                    <a href="#" className="hover:text-primary transition-all">GitHub</a>
                    <a href="#" className="hover:text-primary transition-all">Discord</a>
                </div>
            </footer>
        </main>
    );
};


export default LandingPage;
