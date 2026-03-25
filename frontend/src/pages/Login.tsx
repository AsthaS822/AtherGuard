import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from "../assets/wallpaper.png";

const Login: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

            {/* Login card with glassmorphism */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative backdrop-blur-xl bg-white/5 dark:bg-black/20 p-10 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl text-white mx-4"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold font-sora mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="text-gray-300">Sign in to AetherGuard Shield</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-200">Email Address</label>
                        <input
                            type="email"
                            placeholder="e.g. admin@aetherguard.ai"
                            className="w-full p-3.5 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-primary-accent/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-200">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3.5 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-primary-accent/50 transition-all"
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center cursor-pointer group">
                            <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/10 text-primary-accent focus:ring-primary-accent/50" />
                            <span className="text-gray-300 group-hover:text-white transition-colors">Remember me</span>
                        </label>

                        <a href="#" className="text-primary-glow hover:underline transition-all">
                            Forgot password?
                        </a>
                    </div>

                    <Link
                        to="/app/dashboard"
                        className="w-full block text-center bg-primary-accent hover:bg-primary-accent/90 py-3.5 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] transform active:scale-[0.98] transition-all"
                    >
                        Sign In
                    </Link>

                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <span className="text-primary-glow cursor-pointer hover:underline font-bold">
                            Create Account
                        </span>
                    </p>
                </div>

                <Link to="/" className="mt-6 block text-center text-gray-500 hover:text-white text-xs transition-colors">
                    ← Back to Landing
                </Link>

            </motion.div>
        </div>
    );
};

import { motion } from 'framer-motion';

export default Login;
