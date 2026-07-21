import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Activity, Users, LogOut, Search, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 flex flex-col md:flex-row relative overflow-hidden" dir="rtl">
      {/* Background Tech/Medical Grid & Glow */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900/80 backdrop-blur-xl border-l border-slate-800 flex flex-col md:min-h-screen z-10 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="p-8 border-b border-slate-800/50 flex items-center gap-4 relative z-10">
          <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Activity className="text-blue-400" size={24} />
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">إدارة بدواي</span>
        </div>
        <nav className="flex-1 p-6 space-y-3 relative z-10">
          <Link href="/admin" className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all hover:scale-[1.02] active:scale-95 group">
            <LayoutDashboard size={22} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="font-semibold text-lg">لوحة التحكم</span>
          </Link>
          <Link href="/admin/donors" className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all hover:scale-[1.02] active:scale-95 group">
            <Users size={22} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
            <span className="font-semibold text-lg">سجل المتبرعين</span>
          </Link>
          <Link href="/admin/request" className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all hover:scale-[1.02] active:scale-95 group">
            <Search size={22} className="text-slate-500 group-hover:text-[#D62828] transition-colors" />
            <span className="font-semibold text-lg">طلب فصيلة دم</span>
          </Link>
        </nav>
        <div className="p-6 border-t border-slate-800/50 relative z-10">
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <Button variant="ghost" type="submit" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-3 rounded-xl h-14 text-lg">
              <LogOut size={22} />
              تسجيل الخروج
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
