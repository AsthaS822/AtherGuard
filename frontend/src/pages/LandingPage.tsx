import React from 'react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    Zap, 
    Lock, 
    Globe, 
    Activity, 
    Settings,
    ArrowRight,
    Play
} from 'lucide-react';
import GlowButton from '../components/GlowButton';
import GlassCard from '../components/GlassCard';
import GlowCursor from '../components/GlowCursor';
import SplashReveal from '../components/SplashReveal';
import ScrollSplashTransition from '../components/ScrollSplashTransition';
import PaintSplashBg from '../components/PaintSplashBg';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-primary-glow/30 overflow-x-hidden">
            <GlowCursor />
            <PaintSplashBg />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex items-center justify-between backdrop-blur-md bg-black/20 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-accent to-primary-glow flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                        <ShieldCheck className="text-black w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-sora tracking-tighter">AetherGuard</span>
                </div>
                <div className="hidden lg:flex items-center gap-10 text-sm font-semibold tracking-wide text-gray-400">
                    <a href="#features" className="hover:text-primary-glow transition-all aria-label='Navigate to features'">Features</a>
                    <a href="#dashboard" className="hover:text-primary-glow transition-all aria-label='Navigate to dashboard'">Dashboard</a>
                    <a href="#demo" className="hover:text-primary-glow transition-all aria-label='Navigate to live demo'">Live Demo</a>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-sm font-bold w-full hover:text-primary-glow transition-all aria-label='Sign In'">Sign In</Link>
                    <GlowButton variant="cyan" aria-label="Get Started" className="px-6 py-2.5 text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(0,245,255,0.3)]">Get Started</GlowButton>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20">
                <div className="max-w-5xl mx-auto z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary-glow text-xs font-black tracking-widest uppercase mb-10 shadow-2xl backdrop-blur-xl"
                    >
                        <Zap size={14} className="animate-pulse" /> Next-Gen AI Moderation
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black font-sora mb-8 leading-[1.1] tracking-tighter"
                    >
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            AI Moderation Agent
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-inter font-medium"
                    >
                        Real-time protection from toxic content. Scale your community safely with high-performance neural networks.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8"
                    >
                        <GlowButton aria-label="Get Started Now" onClick={() => window.location.href = '/login'} className="text-xl px-12 py-5 rounded-2xl bg-primary-accent hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all flex items-center gap-2">
                            Get Started Now <ArrowRight size={20} className="ml-2" />
                        </GlowButton>
                        <button aria-label="Book Demo" className="flex items-center gap-4 px-12 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xl font-bold group">
                            <Play size={22} className="fill-white group-hover:fill-primary-glow transition-colors" /> Book Demo
                        </button>
                    </motion.div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl max-h-[600px] bg-primary-accent/10 blur-[150px] rounded-full z-0 pointer-events-none" />
            </section>

            <ScrollSplashTransition />

            {/* Features Section with Splash Reveal */}
            <SplashReveal color="#7C3AED">
                <section id="features" className="py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-7xl font-black font-sora mb-6 text-white tracking-tighter">Engineered for Scale</h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-inter">Advanced protection features for modern digital platforms.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { icon: Zap, title: "Nano-Latency", desc: "Process thousands of requests per second with <20ms average response time." },
                                { icon: ShieldCheck, title: "Neural Filters", desc: "Dynamic AI models that adapt to new slang and subtle toxicity instantly." },
                                { icon: Lock, title: "Privacy First", desc: "Enterprise-grade encryption with local processing options for total data control." },
                                { icon: Globe, title: "Universal", desc: "Support for 120+ languages including complex regional dialects." },
                                { icon: Activity, title: "Intuitive Analytics", desc: "Real-time insights into community health and moderation trends." },
                                { icon: Settings, title: "Fully Custom", desc: "Tailor moderation rules to your specific community guidelines." },
                            ].map((feature, i) => (
                                <GlassCard key={i} className="group p-10 hover:border-primary-glow/50 transition-all border-white/5 bg-white/2">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-glow mb-8 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                                        <feature.icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black font-sora mb-4 text-white uppercase tracking-tight">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-inter text-lg">{feature.desc}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </section>
            </SplashReveal>

            {/* Dashboard Preview Section */}
            <section id="dashboard" className="py-24 px-8 relative z-20">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black font-sora mb-12 text-white tracking-tighter">Smarter Dashboard</h2>
                        <div className="relative mt-12 p-2 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-2xl">
                            <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-black/40 relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2400" 
                                    alt="Analytics Dashboard" 
                                    loading="lazy"
                                    className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-1000"
                                />

                                {/* Fake Analytics Overlay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-6 w-full max-w-2xl pointer-events-none px-4">
                                    <div className="bg-black/80 backdrop-blur-md border border-primary-glow/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,245,255,0.2)] transform -rotate-2">
                                        <p className="text-primary-glow font-black text-4xl mb-2">120K+</p>
                                        <p className="text-gray-300 font-bold tracking-wide">Comments Scanned</p>
                                    </div>
                                    <div className="bg-black/80 backdrop-blur-md border border-primary-accent/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(124,58,237,0.2)] transform rotate-2 translate-y-8">
                                        <p className="text-primary-accent font-black text-4xl mb-2">30,492</p>
                                        <p className="text-gray-300 font-bold tracking-wide">Toxic Filtered</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Live-stats floating badge */}
                            <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-xl">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-bold text-white tracking-wide">Live Monitoring Active</span>
                            </div>

                            {/* Floating decorative glows */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-glow/20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-accent/20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-8 relative overflow-hidden">
                <div className="max-w-5xl mx-auto rounded-[4rem] border border-white/10 p-20 text-center bg-gradient-to-br from-[#1a0033] to-black relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-accent/20 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                    
                    <h2 className="text-5xl md:text-8xl font-black font-sora mb-8 text-white tracking-tighter uppercase italic leading-none">
                        Secure Your <br />
                        <span className="text-primary-glow">Community</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-14 max-w-xl mx-auto font-inter font-medium leading-relaxed">
                        Join 500+ platforms that trust AetherGuard for their content safety. 
                        Start your 14-day free trial today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <GlowButton variant="cyan" className="text-2xl px-16 py-6 rounded-3xl" onClick={() => window.location.href = '/login'}>
                            Get Started
                        </GlowButton>
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">NO CREDIT CARD REQUIRED</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-8 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <ShieldCheck className="text-primary-glow w-8 h-8" />
                            <span className="text-3xl font-black font-sora tracking-tighter">AetherGuard</span>
                        </div>
                        <p className="text-gray-500 text-lg max-w-md leading-relaxed font-inter">
                            Building the future of safe digital interaction. 
                            Our mission is to eliminate toxicity and create spaces where everyone belongs.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-black font-sora mb-8 text-white uppercase tracking-widest text-sm">Platform</h4>
                        <ul className="space-y-4 text-gray-400 font-bold">
                            <li><a href="#" className="hover:text-primary-glow transition-all">Features</a></li>
                            <li><a href="#" className="hover:text-primary-glow transition-all">API Docs</a></li>
                            <li><a href="#" className="hover:text-primary-glow transition-all">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black font-sora mb-8 text-white uppercase tracking-widest text-sm">Connect</h4>
                        <ul className="space-y-4 text-gray-400 font-bold">
                            <li><a href="#" className="hover:text-primary-glow transition-all">X / Twitter</a></li>
                            <li><a href="#" className="hover:text-primary-glow transition-all">GitHub</a></li>
                            <li><a href="#" className="hover:text-primary-glow transition-all">Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-bold text-gray-600">
                    <p>© 2026 AETHERGUARD AI INC. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-12 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-all">Privacy</a>
                        <a href="#" className="hover:text-white transition-all">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
