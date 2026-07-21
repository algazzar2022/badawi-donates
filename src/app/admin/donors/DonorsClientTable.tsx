"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Save, X } from "lucide-react";
import { updateDonorDetails } from "@/app/actions/admin";
import type { Donor } from "@prisma/client";

export default function DonorsClientTable({ initialDonors }: { initialDonors: Donor[] }) {
  const [donors, setDonors] = useState<Donor[]>(initialDonors);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Donor>>({});
  const [loading, setLoading] = useState(false);

  const startEdit = (donor: Donor) => {
    setEditingId(donor.id);
    setEditForm({ ...donor });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editingId) return;
    setLoading(true);
    await updateDonorDetails(editingId, editForm);
    setDonors(donors.map(d => d.id === editingId ? { ...d, ...editForm } as Donor : d));
    setEditingId(null);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-950/80 border-b border-slate-800">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الاسم</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الفصيلة</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">العمر</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">رقم الهاتف</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الإقامة وآخر تبرع</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الأمراض</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">تاريخ التسجيل</TableHead>
              <TableHead className="text-center text-slate-300 font-bold py-4 px-6">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-16 text-slate-500 text-lg">
                  لا يوجد متبرعين مسجلين حتى الآن.
                </TableCell>
              </TableRow>
            ) : (
              donors.map((donor) => {
                const isEditing = editingId === donor.id;
                
                return (
                  <TableRow key={donor.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    {/* Name */}
                    <TableCell className="font-medium text-white px-6 py-4">
                      {isEditing ? (
                        <Input 
                          value={editForm.name || ""} 
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value } as unknown as Partial<Donor>)}
                          className="bg-slate-950 border-slate-700 h-9"
                        />
                      ) : donor.name}
                    </TableCell>

                    {/* BloodType */}
                    <TableCell className="px-6 py-4">
                      {isEditing ? (
                        <Select 
                          value={editForm.bloodType || ""} 
                          onValueChange={(val) => setEditForm({ ...editForm, bloodType: val } as unknown as Partial<Donor>)}
                        >
                          <SelectTrigger className="bg-slate-950 border-slate-700 h-9 w-[80px]" dir="ltr">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700 text-white">
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(t => (
                              <SelectItem key={t} value={t} dir="ltr">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline" className="text-[#D62828] border-[#D62828] font-black shadow-[0_0_10px_rgba(214,40,40,0.2)] bg-slate-950/50" dir="ltr">
                          {donor.bloodType}
                        </Badge>
                      )}
                    </TableCell>

                    {/* Age */}
                    <TableCell className="text-slate-300 px-6 py-4">
                      {isEditing ? (
                        <Input 
                          type="number"
                          value={editForm.age || ""} 
                          onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) || 0 } as unknown as Partial<Donor>)}
                          className="bg-slate-950 border-slate-700 h-9 w-[70px]"
                        />
                      ) : donor.age}
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="font-mono text-blue-400 font-medium px-6 py-4" dir="ltr">
                      {isEditing ? (
                        <Input 
                          dir="ltr"
                          value={editForm.phone || ""} 
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value } as unknown as Partial<Donor>)}
                          className="bg-slate-950 border-slate-700 h-9"
                        />
                      ) : donor.phone}
                    </TableCell>

                    {/* Resident & Last Donation */}
                    <TableCell className="px-6 py-4 space-y-2">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Select 
                            value={editForm.isResident ? "yes" : "no"} 
                            onValueChange={(val) => setEditForm({ ...editForm, isResident: val === "yes" } as unknown as Partial<Donor>)}
                          >
                            <SelectTrigger className="bg-slate-950 border-slate-700 h-9 w-[120px]">
                              <SelectValue placeholder="الإقامة" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="yes">مقيم ببدواي</SelectItem>
                              <SelectItem value="no">خارج بدواي</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select 
                            value={editForm.lastDonation || "more_than_4"} 
                            onValueChange={(val) => setEditForm({ ...editForm, lastDonation: val } as unknown as Partial<Donor>)}
                          >
                            <SelectTrigger className="bg-slate-950 border-slate-700 h-9 w-[120px]">
                              <SelectValue placeholder="آخر تبرع" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="less_than_4">أقل من 4 شهور</SelectItem>
                              <SelectItem value="more_than_4">أكثر من 4 شهور</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {donor.isResident ? (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">مقيم ببدواي</Badge>
                          ) : (
                            <Badge variant="outline" className="text-orange-400 border-orange-500/20 bg-orange-500/10 w-fit">خارج بدواي</Badge>
                          )}
                          {donor.lastDonation === "less_than_4" ? (
                            <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 w-fit">أقل من 4 شهور</Badge>
                          ) : (
                            <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">أكثر من 4 شهور</Badge>
                          )}
                        </div>
                      )}
                    </TableCell>

                    {/* Diseases */}
                    <TableCell className="px-6 py-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Select 
                            value={editForm.hasDiseases ? "yes" : "no"} 
                            onValueChange={(val) => setEditForm({ ...editForm, hasDiseases: val === "yes", diseasesList: val === "no" ? null : editForm.diseasesList } as unknown as Partial<Donor>)}
                          >
                            <SelectTrigger className="bg-slate-950 border-slate-700 h-9 w-[100px]">
                              <SelectValue placeholder="أمراض؟" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="no">سليم</SelectItem>
                              <SelectItem value="yes">نعم يعاني</SelectItem>
                            </SelectContent>
                          </Select>
                          {editForm.hasDiseases && (
                            <Input 
                              placeholder="الأمراض..."
                              value={editForm.diseasesList || ""} 
                              onChange={(e) => setEditForm({ ...editForm, diseasesList: e.target.value } as unknown as Partial<Donor>)}
                              className="bg-slate-950 border-slate-700 h-9 w-[150px]"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {donor.hasDiseases ? (
                            <>
                              <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 w-fit">يوجد أمراض</Badge>
                              <span className="text-xs text-slate-400 truncate max-w-[150px]" title={donor.diseasesList || ""}>{donor.diseasesList}</span>
                            </>
                          ) : (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">سليم</Badge>
                          )}
                        </div>
                      )}
                    </TableCell>

                    {/* CreatedAt */}
                    <TableCell className="text-slate-500 text-sm px-6 py-4">
                      {format(new Date(donor.createdAt), "dd MMM yyyy", { locale: ar })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 py-4 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button size="icon" variant="ghost" onClick={handleSave} disabled={loading} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/30">
                            <Save size={18} />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit} disabled={loading} className="text-slate-400 hover:text-slate-300 hover:bg-slate-800">
                            <X size={18} />
                          </Button>
                        </div>
                      ) : (
                        <Button size="icon" variant="ghost" onClick={() => startEdit(donor)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30">
                          <Edit2 size={18} />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
