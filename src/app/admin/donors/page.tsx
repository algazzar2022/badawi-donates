import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Users } from "lucide-react";
import DonorsClientTable from "./DonorsClientTable";

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

      <DonorsClientTable initialDonors={donors} />
    </div>
  );
}
