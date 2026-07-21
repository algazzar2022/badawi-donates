"use client";

import { useActionState, useEffect, useState } from "react";
import { registerDonor } from "../actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const initialState = {
  success: false,
  errors: undefined,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerDonor, initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden relative">
      {/* Background Tech Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D62828] opacity-[0.1] blur-[150px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600 opacity-[0.08] blur-[150px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-xl w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {state?.success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <Card className="w-full text-center py-12 px-6 shadow-2xl border border-emerald-500/20 bg-slate-900/80 backdrop-blur-xl">
                <CardContent className="space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white">تم التسجيل بنجاح!</h2>
                  <p className="text-lg text-slate-300 font-light leading-relaxed">
                    {state.message}
                  </p>
                  <div className="pt-8">
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-500 w-full text-white font-bold h-14 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
                      <Link href="/">العودة للرئيسية</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700 text-[#D62828] mb-6 hover:scale-110 transition-transform shadow-[0_0_20px_rgba(214,40,40,0.2)]">
                  <Activity size={32} />
                </Link>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">تسجيل متبرع جديد</h2>
                <p className="mt-3 text-slate-400">
                  انضم لشبكة بدواي، بياناتك مشفرة ومحفوظة بسرية تامة.
                </p>
              </div>

              <Card className="shadow-2xl border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[#D62828] via-purple-500 to-blue-500"></div>
                <CardContent className="p-6 sm:p-8">
                  <form action={formAction} className="space-y-6">
                    
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">الاسم بالكامل <span className="text-[#D62828]">*</span></Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="أحمد محمد مصطفى" 
                        required 
                        className="h-12 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus-visible:ring-[#D62828] focus-visible:border-[#D62828]" 
                      />
                      {state?.errors?.name && <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-sm text-red-400">{state.errors.name[0]}</motion.p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-slate-300">العمر <span className="text-[#D62828]">*</span></Label>
                        <Input 
                          id="age" 
                          name="age" 
                          type="number" 
                          placeholder="25" 
                          required 
                          className="h-12 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus-visible:ring-[#D62828]" 
                        />
                        {state?.errors?.age && <p className="text-sm text-red-400">{state.errors.age[0]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bloodType" className="text-slate-300">فصيلة الدم <span className="text-[#D62828]">*</span></Label>
                        <Select name="bloodType" required>
                          <SelectTrigger className="h-12 bg-slate-950/50 border-slate-700 text-white focus:ring-[#D62828]">
                            <SelectValue placeholder="اختر الفصيلة" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700 text-white">
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                              <SelectItem key={type} value={type} dir="ltr" className="focus:bg-slate-800 focus:text-white">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {state?.errors?.bloodType && <p className="text-sm text-red-400">{state.errors.bloodType[0]}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-300">رقم الهاتف <span className="text-[#D62828]">*</span></Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        dir="ltr" 
                        placeholder="01xxxxxxxxx" 
                        required 
                        className="h-12 bg-slate-950/50 border-slate-700 text-white text-right placeholder:text-slate-600 focus-visible:ring-[#D62828]" 
                      />
                      {state?.errors?.phone && <p className="text-sm text-red-400">{state.errors.phone[0]}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-slate-300">العنوان بالتفصيل <span className="text-[#D62828]">*</span></Label>
                      <Input 
                        id="address" 
                        name="address" 
                        placeholder="مثال: بجوار المسجد الكبير" 
                        required 
                        className="h-12 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus-visible:ring-[#D62828]" 
                      />
                      {state?.errors?.address && <p className="text-sm text-red-400">{state.errors.address[0]}</p>}
                    </div>

                    <div className="space-y-3 pt-2">
                      <Label className="text-slate-300">هل أنت مقيم بقرية بدواي حالياً؟ <span className="text-[#D62828]">*</span></Label>
                      <div className="flex gap-4">
                        <label className="relative flex items-center justify-center gap-2 border border-slate-700 bg-slate-950/30 p-4 rounded-xl flex-1 cursor-pointer hover:bg-slate-800 transition-colors has-[:checked]:border-[#D62828] has-[:checked]:bg-[#D62828]/10 group">
                          <input type="radio" name="isResident" value="yes" defaultChecked className="peer sr-only" />
                          <div className="w-4 h-4 rounded-full border-2 border-slate-500 peer-checked:border-[#D62828] peer-checked:bg-[#D62828] transition-all"></div>
                          <span className="text-slate-300 peer-checked:text-white font-medium">نعم، مقيم</span>
                        </label>
                        <label className="relative flex items-center justify-center gap-2 border border-slate-700 bg-slate-950/30 p-4 rounded-xl flex-1 cursor-pointer hover:bg-slate-800 transition-colors has-[:checked]:border-[#D62828] has-[:checked]:bg-[#D62828]/10 group">
                          <input type="radio" name="isResident" value="no" className="peer sr-only" />
                          <div className="w-4 h-4 rounded-full border-2 border-slate-500 peer-checked:border-[#D62828] peer-checked:bg-[#D62828] transition-all"></div>
                          <span className="text-slate-300 peer-checked:text-white font-medium">لا، خارج بدواي</span>
                        </label>
                      </div>
                      {state?.errors?.isResident && <p className="text-sm text-red-400">{state.errors.isResident[0]}</p>}
                    </div>

                    <div className="pt-2">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-900/20 border border-blue-800/30 text-blue-300 text-sm mb-6">
                        <ShieldCheck className="shrink-0 mt-0.5 text-blue-400" size={18} />
                        <p>بضغطك على "تسجيل بياناتي"، أنت تؤكد صحة البيانات وأنك توافق على تواصل إدارة الشبكة معك عند وجود حالة طارئة.</p>
                      </div>

                      {state?.message && !state.success && (
                        <div className="p-4 mb-6 bg-red-900/20 border border-red-800/30 text-red-400 rounded-xl text-sm flex items-start gap-3">
                          <div className="shrink-0 mt-0.5">⚠️</div>
                          <p>{state.message}</p>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        disabled={isPending} 
                        className="w-full h-14 bg-gradient-to-r from-[#D62828] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(214,40,40,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري التشفير والتسجيل...
                          </span>
                        ) : (
                          "تسجيل بياناتي"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
