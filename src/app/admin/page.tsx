import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Droplets, MapPin } from "lucide-react";

export default async function AdminDashboard() {
  const totalDonors = await prisma.donor.count();
  
  const residentsCount = await prisma.donor.count({
    where: { isResident: true }
  });
  
  const nonResidentsCount = await prisma.donor.count({
    where: { isResident: false }
  });

  const bloodTypes = await prisma.donor.groupBy({
    by: ['bloodType'],
    _count: {
      bloodType: true
    }
  });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black text-white">نظرة عامة</h1>
        <p className="text-slate-400 mt-3 text-lg">إحصائيات وبيانات شبكة المتبرعين بقرية بدواي في الوقت الفعلي.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl hover:bg-slate-800/80 transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-400">إجمالي المتبرعين</h2>
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Users className="text-blue-400 w-6 h-6" />
              </div>
            </div>
            <div className="text-5xl font-black text-white">{totalDonors}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl hover:bg-slate-800/80 transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-400">مقيم ببدواي</h2>
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <MapPin className="text-emerald-400 w-6 h-6" />
              </div>
            </div>
            <div className="text-5xl font-black text-white">{residentsCount}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl hover:bg-slate-800/80 transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-400">خارج بدواي</h2>
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <MapPin className="text-orange-400 w-6 h-6" />
              </div>
            </div>
            <div className="text-5xl font-black text-white">{nonResidentsCount}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl hover:bg-slate-800/80 transition-all duration-300">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-400">الفصائل المتاحة</h2>
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Droplets className="text-purple-400 w-6 h-6" />
              </div>
            </div>
            <div className="text-5xl font-black text-white">{bloodTypes.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Blood Types Distribution */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Droplets className="text-[#D62828]" />
          توزيع الفصائل التفصيلي
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => {
            const count = bloodTypes.find(b => b.bloodType === type)?._count.bloodType || 0;
            return (
              <Card key={type} className="border-slate-800 bg-slate-950/80 text-center py-6 hover:border-[#D62828]/50 transition-colors shadow-inner">
                <div className="text-xl font-bold text-[#D62828] mb-2 drop-shadow-[0_0_5px_rgba(214,40,40,0.5)]" dir="ltr">{type}</div>
                <div className="text-3xl font-black text-white">{count}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
