import React, { useState, useContext, useEffect } from "react";
import { User as UserIcon, Mail, Upload, Save, LogOut } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || user.email?.split('@')[0] || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    // 🔗 API call logic here if needed for extended profile data
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    alert("Profile changes simulated!");
  };

  const handleLogout = async () => {
    try {
        await logout();
        localStorage.clear();
        navigate("/");
    } catch (err) {
        console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main text-[var(--text-primary)] p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black tracking-tight font-sora uppercase italic text-[var(--text-primary)]">
          Profile <span className="text-[var(--accent-primary)]">Settings</span>
        </h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: PROFILE CARD */}
        <GlassCard className="p-6 flex flex-col items-center text-center border-[var(--border-dim)] bg-[var(--bg-surface)]">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center border border-[var(--border-dim)] overflow-hidden">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
              ) : (
                <UserIcon size={40} className="text-[var(--text-secondary)]" />
              )}
            </div>

            <label className="absolute bottom-0 right-0 bg-[var(--accent-primary)] p-2 rounded-full cursor-pointer shadow-glow">
              <Upload size={14} className="text-white" />
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setAvatar(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">{name}</h2>
          <p className="text-[var(--text-secondary)] text-sm">{email}</p>
        </GlassCard>

        {/* RIGHT: SETTINGS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* BASIC INFO */}
          <GlassCard className="p-6 border-[var(--border-dim)] bg-[var(--bg-surface)]">
            <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">Basic Information</h3>

            <div className="space-y-4">
              
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-1 block">
                  Full Name
                </label>
                <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border-dim)] rounded-xl px-3 py-2">
                  <UserIcon size={16} className="text-[var(--text-secondary)]" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent outline-none w-full text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-1 block">
                  Email
                </label>
                <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border-dim)] rounded-xl px-3 py-2">
                  <Mail size={16} className="text-[var(--text-secondary)]" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none w-full text-[var(--text-primary)]"
                  />
                </div>
              </div>

            </div>
          </GlassCard>

          {/* PREFERENCES */}
          <GlassCard className="p-6 border-[var(--border-dim)] bg-[var(--bg-surface)]">
            <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">Preferences</h3>

            <div className="space-y-6">
              
              {/* AI Sensitivity */}
              <div>
                <label className="text-sm text-[var(--text-secondary)] block mb-2">
                  AI Moderation Sensitivity
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full accent-[var(--accent-primary)]"
                />
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Higher = stricter moderation
                </p>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">
                  Theme Appearance
                </span>
                <ThemeToggle />
              </div>

            </div>
          </GlassCard>

          {/* ACTIONS */}
          <GlassCard className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-[var(--border-dim)] bg-[var(--bg-surface)]">
            <GlowButton
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </GlowButton>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:opacity-80 font-bold transition-all"
            >
              <LogOut size={18} />
              Logout Session
            </button>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};

export default Profile;
