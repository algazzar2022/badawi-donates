import { getAdmins, addAdmin, deleteAdmin } from "@/app/actions/admins";
import { auth } from "@/auth";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ShieldAlert, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const admins = await getAdmins();
  const isSuper = session.user.isSuper;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-400 mb-2">
            إدارة المشرفين
          </h1>
          <p className="text-slate-400">
            إدارة الحسابات التي لها صلاحية الدخول للوحة التحكم.
          </p>
        </div>
      </div>

      {isSuper && (
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <UserPlus className="text-blue-400" />
            إضافة مشرف جديد
          </h2>
          <form action={addAdmin} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full grid gap-2">
              <label className="text-sm font-medium text-slate-300">البريد الإلكتروني</label>
              <Input name="email" type="email" required placeholder="admin@badawi.com" className="bg-slate-950 border-slate-700" />
            </div>
            <div className="flex-1 w-full grid gap-2">
              <label className="text-sm font-medium text-slate-300">كلمة المرور</label>
              <Input name="password" type="password" required placeholder="********" className="bg-slate-950 border-slate-700" />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-10 w-full sm:w-auto">
              إضافة
            </Button>
          </form>
        </div>
      )}

      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-950/80 border-b border-slate-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">البريد الإلكتروني</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الصلاحيات</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">تاريخ الإنشاء</TableHead>
                <TableHead className="text-center text-slate-300 font-bold py-4 px-6">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <TableCell className="font-medium text-white px-6 py-4">{admin.email}</TableCell>
                  <TableCell className="px-6 py-4">
                    {admin.isSuper ? (
                      <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 gap-1 px-2 py-1">
                        <ShieldAlert size={14} /> مشرف رئيسي
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 gap-1 px-2 py-1">
                        <ShieldCheck size={14} /> مشرف فرعي
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm px-6 py-4">
                    {format(new Date(admin.createdAt), "dd MMM yyyy", { locale: ar })}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    {(isSuper && session.user.id !== admin.id) || (!isSuper && session.user.id === admin.id) ? (
                      <form action={async () => {
                        "use server";
                        await deleteAdmin(admin.id);
                      }}>
                        <Button type="submit" size="icon" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                          <Trash2 size={18} />
                        </Button>
                      </form>
                    ) : (
                      <span className="text-slate-600 text-xs">لا يمكن حذفه</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
