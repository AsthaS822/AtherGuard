import React from 'react';

/**
 * Full-screen purple paint splash video background.
 * Video source: public/videos/purplepaintsplash.mp4
 */
const PaintSplashBg: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Animated gradient fallback shown behind the video */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.22) 0%, transparent 70%), ' +
                        'radial-gradient(ellipse 60% 50% at 80% 100%, rgba(188,19,254,0.15) 0%, transparent 70%), ' +
                        'radial-gradient(ellipse 50% 40% at 10% 80%, rgba(0,245,255,0.08) 0%, transparent 70%), ' +
                        '#000',
                }}
            />

            {/* REMOVE VIDEO — keep only gradient */}
            <div className="absolute inset-0 bg-black/55" />
        </div>
    );
};

export default PaintSplashBg;
