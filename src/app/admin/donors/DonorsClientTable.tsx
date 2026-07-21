"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Save, Trash2, X } from "lucide-react";
import { updateDonorDetails, deleteDonor } from "@/app/actions/admin";
import type { Donor } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function DonorsClientTable({ initialDonors }: { initialDonors: Donor[] }) {
  const [donors, setDonors] = useState<Donor[]>(initialDonors);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Donor>>({});
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const startEdit = (donor: Donor) => {
    setEditForm({ ...donor });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editForm.id) return;
    setLoading(true);
    await updateDonorDetails(editForm.id, editForm);
    setDonors(donors.map(d => d.id === editForm.id ? { ...d, ...editForm } as Donor : d));
    setIsEditModalOpen(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setLoading(true);
    await deleteDonor(deletingId);
    setDonors(donors.filter(d => d.id !== deletingId));
    setIsDeleteModalOpen(false);
    setDeletingId(null);
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
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">متى تبرع</TableHead>
              <TableHead className="text-right text-slate-300 font-bold py-4 px-6">الحالة الصحية</TableHead>
              <TableHead className="text-center text-slate-300 font-bold py-4 px-6">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16 text-slate-500 text-lg">
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
                  <TableCell className="px-6 py-4">
                    {donor.lastDonation === "less_than_4" ? (
                      <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 w-fit">أقل من 4 شهور</Badge>
                    ) : (
                      <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">أكثر من 4 شهور</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {donor.hasDiseases ? (
                      <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 w-fit">مريض</Badge>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">سليم</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(donor)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30">
                        <Edit2 size={18} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { setDeletingId(donor.id); setIsDeleteModalOpen(true); }} className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-100 text-right">تعديل بيانات المتبرع</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-300">الاسم</label>
              <Input 
                value={editForm.name || ""} 
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value } as unknown as Partial<Donor>)}
                className="bg-slate-950 border-slate-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">الفصيلة</label>
                <Select 
                  value={editForm.bloodType || ""} 
                  onValueChange={(val) => setEditForm({ ...editForm, bloodType: val } as unknown as Partial<Donor>)}
                >
                  <SelectTrigger className="bg-slate-950 border-slate-700" dir="ltr">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(t => (
                      <SelectItem key={t} value={t} dir="ltr">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">العمر</label>
                <Input 
                  type="number"
                  value={editForm.age || ""} 
                  onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) || 0 } as unknown as Partial<Donor>)}
                  className="bg-slate-950 border-slate-700"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-300">رقم الهاتف</label>
              <Input 
                dir="ltr"
                value={editForm.phone || ""} 
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value } as unknown as Partial<Donor>)}
                className="bg-slate-950 border-slate-700 text-right"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-300">العنوان</label>
              <Input 
                value={editForm.address || ""} 
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value } as unknown as Partial<Donor>)}
                className="bg-slate-950 border-slate-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">الإقامة</label>
                <Select 
                  value={editForm.isResident ? "yes" : "no"} 
                  onValueChange={(val) => setEditForm({ ...editForm, isResident: val === "yes" } as unknown as Partial<Donor>)}
                >
                  <SelectTrigger className="bg-slate-950 border-slate-700">
                    <SelectValue>
                      {editForm.isResident ? "مقيم ببدواي" : "خارج بدواي"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    <SelectItem value="yes">مقيم ببدواي</SelectItem>
                    <SelectItem value="no">خارج بدواي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">آخر تبرع</label>
                <Select 
                  value={editForm.lastDonation || "more_than_4"} 
                  onValueChange={(val) => setEditForm({ ...editForm, lastDonation: val } as unknown as Partial<Donor>)}
                >
                  <SelectTrigger className="bg-slate-950 border-slate-700">
                    <SelectValue>
                      {editForm.lastDonation === "less_than_4" ? "أقل من 4 شهور" : "أكثر من 4 شهور"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    <SelectItem value="less_than_4">أقل من 4 شهور</SelectItem>
                    <SelectItem value="more_than_4">أكثر من 4 شهور</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-300">الحالة الصحية</label>
              <Select 
                value={editForm.hasDiseases ? "yes" : "no"} 
                onValueChange={(val) => setEditForm({ ...editForm, hasDiseases: val === "yes", diseasesList: val === "no" ? null : editForm.diseasesList } as unknown as Partial<Donor>)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-700">
                  <SelectValue>
                    {editForm.hasDiseases ? "نعم يعاني من أمراض" : "سليم"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white">
                  <SelectItem value="no">سليم</SelectItem>
                  <SelectItem value="yes">نعم يعاني من أمراض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {editForm.hasDiseases && (
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">الأمراض (تفاصيل)</label>
                <Input 
                  placeholder="اكتب الأمراض هنا..."
                  value={editForm.diseasesList || ""} 
                  onChange={(e) => setEditForm({ ...editForm, diseasesList: e.target.value } as unknown as Partial<Donor>)}
                  className="bg-slate-950 border-slate-700"
                />
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0 sm:justify-start flex-row-reverse">
            <Button onClick={handleSave} disabled={loading} className="bg-[#D62828] hover:bg-[#D62828]/90 text-white mr-auto">
              {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
            </Button>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} disabled={loading} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-100 text-right">حذف متبرع</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-slate-300">
            هل أنت متأكد من أنك تريد حذف هذا المتبرع نهائياً؟ لا يمكن التراجع عن هذه الخطوة.
          </div>
          <DialogFooter className="gap-2 sm:gap-0 sm:justify-start flex-row-reverse">
            <Button onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white mr-auto">
              {loading ? "جاري الحذف..." : "حذف نهائي"}
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={loading} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
