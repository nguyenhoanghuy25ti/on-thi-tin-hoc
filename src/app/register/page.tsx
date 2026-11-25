"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, GraduationCap, Lock, Mail, User, AlertCircle, Brain, Database } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orientationPreference, setOrientationPreference] = useState<"CS" | "ICT">("ICT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, orientationPreference }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại.");
        setLoading(false);
        return;
      }

      router.push("/exams");
      router.refresh();
    } catch (err: any) {
      setError("Lỗi kết nối máy chủ.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
            Đăng ký tài khoản học sinh
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Luyện thi THPT môn Tin học (GDPT 2018)
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Họ và tên học sinh
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn An"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email đăng nhập
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nguyenvanan@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Định hướng ưu tiên (Phần II)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrientationPreference("ICT")}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  orientationPreference === "ICT"
                    ? "border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <Database className={`w-4 h-4 mt-0.5 ${orientationPreference === "ICT" ? "text-emerald-600" : "text-slate-400"}`} />
                <div>
                  <div className="text-xs font-bold">ICT (Ứng dụng)</div>
                  <div className="text-[10px] text-slate-500">CSDL, SQL, Web</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrientationPreference("CS")}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  orientationPreference === "CS"
                    ? "border-blue-500 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <Brain className={`w-4 h-4 mt-0.5 ${orientationPreference === "CS" ? "text-blue-600" : "text-slate-400"}`} />
                <div>
                  <div className="text-xs font-bold">CS (Khoa học MT)</div>
                  <div className="text-[10px] text-slate-500">Thuật toán, Python</div>
                </div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              "Đang đăng ký..."
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Tạo tài khoản học sinh
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
