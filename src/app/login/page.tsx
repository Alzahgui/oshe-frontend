"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield, Eye, EyeOff, Lock, Mail, ArrowRight,
  Building2, Users, Award, HardHat, ChevronRight, Globe,
} from "lucide-react";

const teal = "#03ADB4";
const pink = "#FD2EBB";
const navy = "#0B1628";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.detail ?? "Invalid credentials. Please try again.");
        return;
      }

      const { access, refresh } = await res.json();
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      router.push("/");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>

      {/* ── Left panel – branding ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col" style={{ background: navy }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(70% 60% at 10% 40%, rgba(3,173,180,0.18) 0%, transparent 55%), radial-gradient(50% 50% at 90% 20%, rgba(253,46,187,0.12) 0%, transparent 50%), radial-gradient(40% 40% at 70% 80%, rgba(3,173,180,0.08) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative flex flex-col h-full px-12 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)" }}>
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-extrabold text-[1.1rem] leading-tight text-white">MANOSH</div>
              <div className="text-[0.6rem] font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>MONGOLIA OSH ASSOCIATION</div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mt-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: teal }} />
              <span className="text-[0.72rem] font-bold tracking-wider" style={{ color: teal }}>MEMBER PORTAL</span>
            </div>

            <h1 className="font-extrabold text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,3vw,2.75rem)" }}>
              Building{" "}
              <span style={{ background: "linear-gradient(135deg, #03ADB4 0%, #FD2EBB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Safer Workplaces
              </span>{" "}
              Across Mongolia
            </h1>
            <p className="leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
              Access your OSH dashboard, compliance reports, training certificates, and AI-powered safety tools — all in one secure portal.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { icon: <Building2 className="w-4 h-4" style={{ color: teal }} />, bg: "rgba(3,173,180,0.12)", border: "rgba(3,173,180,0.2)", value: "2,847+", label: "Member Companies" },
                { icon: <Users className="w-4 h-4" style={{ color: pink }} />, bg: "rgba(253,46,187,0.12)", border: "rgba(253,46,187,0.2)", value: "47,000+", label: "Workers Protected" },
                { icon: <Award className="w-4 h-4" style={{ color: teal }} />, bg: "rgba(3,173,180,0.12)", border: "rgba(3,173,180,0.2)", value: "98.2%", label: "Compliance Rate" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                    {s.icon}
                  </div>
                  <div className="font-extrabold text-white text-[1.2rem] leading-none">{s.value}</div>
                  <div className="text-[0.72rem] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { icon: <HardHat className="w-3 h-3" />, label: "ISO 45001 Compliance" },
              { icon: <Shield className="w-3 h-3" />, label: "Safety Audits" },
              { icon: <Award className="w-3 h-3" />, label: "Certifications" },
            ].map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-semibold" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
                {f.icon} {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12" style={{ background: "#F8FAFC" }}>
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)" }}>
            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-extrabold text-[1.1rem] leading-tight" style={{ color: navy }}>MANOSH</div>
            <div className="text-[0.6rem] font-medium tracking-wider" style={{ color: "#6B7C93" }}>MONGOLIA OSH ASSOCIATION</div>
          </div>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-extrabold text-[1.75rem] leading-tight mb-2" style={{ color: navy }}>
              Welcome back
            </h2>
            <p className="text-[0.9rem]" style={{ color: "#6B7C93" }}>
              Sign in to your MANOSH member portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B7C93" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.mn"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                  style={{
                    border: "1.5px solid rgba(11,22,40,0.12)",
                    color: navy,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = teal)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,22,40,0.12)")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[0.82rem] font-semibold" style={{ color: navy }}>
                  Password
                </label>
                <a href="#" className="text-[0.78rem] font-semibold hover:underline" style={{ color: teal }}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B7C93" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                  style={{
                    border: "1.5px solid rgba(11,22,40,0.12)",
                    color: navy,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = teal)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,22,40,0.12)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors hover:bg-gray-100"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" style={{ color: "#6B7C93" }} />
                    : <Eye className="w-4 h-4" style={{ color: "#6B7C93" }} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: teal }}
              />
              <label htmlFor="remember" className="text-[0.82rem] cursor-pointer select-none" style={{ color: "#6B7C93" }}>
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl px-4 py-3 text-[0.82rem] font-medium" style={{ background: "rgba(253,46,187,0.08)", border: "1px solid rgba(253,46,187,0.25)", color: "#c0185a" }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed mt-2"
              style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)", boxShadow: "0 8px 25px rgba(3,173,180,0.35)" }}
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <>Sign in to Member Portal <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(11,22,40,0.1)" }} />
            <span className="text-[0.75rem] font-medium" style={{ color: "#6B7C93" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(11,22,40,0.1)" }} />
          </div>

          {/* SSO */}
          <button className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold bg-white transition-all hover:shadow-md" style={{ border: "1.5px solid rgba(11,22,40,0.12)", color: navy }}>
            <Globe className="w-4 h-4" style={{ color: teal }} />
            Continue with Organization SSO
          </button>

          {/* Register */}
          <p className="text-center text-[0.82rem] mt-6" style={{ color: "#6B7C93" }}>
            Not a member yet?{" "}
            <a href="#" className="font-bold hover:underline" style={{ color: teal }}>
              Apply for membership <ChevronRight className="w-3 h-3 inline-block -mt-0.5" />
            </a>
          </p>

          {/* Footer note */}
          <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(11,22,40,0.07)" }}>
            <p className="text-center text-[0.72rem] leading-relaxed" style={{ color: "#6B7C93" }}>
              Protected by ISO 45001-compliant security standards.
              <br />
              Need help?{" "}
              <a href="#" className="font-semibold hover:underline" style={{ color: teal }}>Contact support</a>{" "}
              or call{" "}
              <span style={{ color: navy, fontWeight: 600 }}>+976 11-329-000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
