import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Users } from "lucide-react";

export default async function DonorsPage() {
  const donors = await prisma.donor.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white flex items-center gap-3">
          <Users className="text-blue-400" size={36} />
          سجل المتبرعين
        </h1>
        <p className="text-slate-400 mt-3 text-lg">
          عرض جميع المتبرعين المسجلين في الشبكة. <span className="text-emerald-400 font-bold">تذكر أن هذه البيانات سرية للغاية.</span>
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-950/80 border-b border-slate-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الاسم</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الفصيلة</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">العمر</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">رقم الهاتف</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الإقامة</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">العنوان</TableHead>
                <TableHead className="text-right text-slate-300 font-bold py-4 px-6">تاريخ التسجيل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16 text-slate-500 text-lg">
                    لا يوجد متبرعين مسجلين حتى الآن.
                  </TableCell>
                </TableRow>
              ) : (
                donors.map((donor) => (
                  <TableRow key={donor.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-medium text-white px-6 py-4">{donor.name}</TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className="text-[#D62828] border-[#D62828] font-black shadow-[0_0_10px_rgba(214,40,40,0.2)] bg-slate-950/50" dir="ltr">
                        {donor.bloodType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 px-6 py-4">{donor.age}</TableCell>
                    <TableCell className="font-mono text-blue-400 font-medium px-6 py-4" dir="ltr">{donor.phone}</TableCell>
                    <TableCell className="px-6 py-4">
                      {donor.isResident ? (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20">مقيم ببدواي</Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-400 border-orange-500/20 bg-orange-500/10">خارج بدواي</Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-slate-400 px-6 py-4" title={donor.address}>{donor.address}</TableCell>
                    <TableCell className="text-slate-500 text-sm px-6 py-4">
                      {format(new Date(donor.createdAt), "dd MMMM yyyy", { locale: ar })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
