"use client";

import { useState } from "react";
import { searchDonors, updateDonorStatus } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Search, CheckCircle, XCircle, Clock, Droplets } from "lucide-react";
import type { Donor } from "@prisma/client";

export default function BloodRequestPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(formData: FormData) {
    setLoading(true);
    setSearched(true);
    const results = await searchDonors(formData);
    setDonors(results);
    setLoading(false);
  }

  async function handleStatusUpdate(id: string, status: string) {
    await updateDonorStatus(id, status);
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 gap-2 px-3 py-1.5"><CheckCircle size={16}/> وافق على التبرع</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 gap-2 px-3 py-1.5"><XCircle size={16}/> اعتذر / غير متاح</Badge>;
      case "no_answer":
        return <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 gap-2 px-3 py-1.5"><Clock size={16}/> لم يتم الرد</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-400 border-slate-700 px-3 py-1.5">في الانتظار</Badge>;
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white flex items-center gap-3">
          <Search className="text-[#D62828]" size={36} />
          طلب فصيلة دم (البحث)
        </h1>
        <p className="text-slate-400 mt-3 text-lg">ابحث عن متبرعين حسب الفصيلة للتواصل معهم بشكل مباشر وسري جداً.</p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-2xl">
        <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-5">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Droplets className="text-blue-400" size={20} />
            معايير البحث
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form action={handleSearch} className="flex flex-col md:flex-row gap-6 items-end">
            <div className="w-full md:w-1/3 space-y-3">
              <label className="text-sm font-semibold text-slate-300">الفصيلة المطلوبة</label>
              <Select name="bloodType" required>
                <SelectTrigger className="h-14 bg-slate-950 border-slate-700 text-white focus:ring-blue-500 text-lg">
                  <SelectValue placeholder="اختر الفصيلة" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <SelectItem key={type} value={type} dir="ltr" className="focus:bg-slate-800 text-lg font-bold">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/3 space-y-3">
              <label className="text-sm font-semibold text-slate-300">الإقامة</label>
              <Select name="isResident" defaultValue="all">
                <SelectTrigger className="h-14 bg-slate-950 border-slate-700 text-white focus:ring-blue-500 text-lg">
                  <SelectValue placeholder="الكل" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white">
                  <SelectItem value="all" className="focus:bg-slate-800">الكل (مقيم وخارج)</SelectItem>
                  <SelectItem value="yes" className="focus:bg-slate-800">مقيم بقرية بدواي فقط</SelectItem>
                  <SelectItem value="no" className="focus:bg-slate-800">خارج بدواي فقط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white gap-3 font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
              <Search size={22} />
              {loading ? "جاري البحث..." : "بحث الآن"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searched && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              نتائج البحث <span className="text-blue-400 bg-blue-400/10 px-3 py-1 rounded-lg text-lg ml-2">{donors.length} متبرع</span>
            </h2>
          </div>
          
          {donors.length === 0 ? (
            <Card className="border-dashed border-2 border-slate-800 bg-slate-900/30 backdrop-blur-sm">
              <CardContent className="py-20 text-center text-slate-500 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
                  <Search size={40} />
                </div>
                <p className="text-xl">لا يوجد متبرعين مسجلين بهذه المواصفات حالياً.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donors.map((donor) => (
                <Card key={donor.id} className="border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-2xl text-white mb-2">{donor.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">العمر: {donor.age}</span>
                          <span className="text-sm font-medium px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">{donor.isResident ? "مقيم ببدواي" : "خارج بدواي"}</span>
                          <span className="text-sm font-medium px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">{donor.hasDiseases ? "يعاني من أمراض" : "سليم"}</span>
                          <span className="text-sm font-medium px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">{donor.diseasesList || "لا يوجد أمراض"}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[#D62828] border-[#D62828] font-black text-2xl px-4 py-2 shadow-[0_0_15px_rgba(214,40,40,0.3)] bg-slate-950" dir="ltr">
                        {donor.bloodType}
                      </Badge>
                    </div>
                    
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                      <div className="flex items-center gap-3 text-blue-400 font-mono text-xl tracking-wider font-bold" dir="ltr">
                        <Phone size={20} className="text-slate-500" />
                        {donor.phone}
                      </div>
                      <a href={`tel:${donor.phone}`}>
                        <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]">
                          اتصال بالمتبرع
                        </Button>
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-800">
                      <div className="flex-1 w-full text-right">
                        {getStatusBadge(donor.status)}
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(donor.id, "approved")} className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 bg-emerald-950/30">
                          وافق
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(donor.id, "rejected")} className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-red-950/30">
                          اعتذر
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(donor.id, "no_answer")} className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 bg-orange-950/30">
                          لم يرد
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
