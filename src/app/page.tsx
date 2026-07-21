"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShieldCheck, PhoneCall, UserCheck, Activity, Droplets, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 overflow-hidden font-sans selection:bg-[#D62828] selection:text-white">
      {/* Background Tech/Medical Grid & Glow */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#D62828] opacity-[0.15] blur-[120px] rounded-full z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-24 pb-20 lg:px-8 lg:pt-36 max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8 p-4 rounded-full bg-slate-900/50 border border-slate-800 shadow-[0_0_30px_rgba(214,40,40,0.3)] backdrop-blur-md flex items-center justify-center"
        >
          <Droplets className="text-[#D62828]" size={40} />
        </motion.div>
        
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
            className="text-5xl font-black tracking-tight text-white sm:text-7xl text-balance leading-tight"
          >
            تبرعك بالدم قد <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#ff6b6b] drop-shadow-[0_0_15px_rgba(214,40,40,0.5)]">ينقذ حياة إنسان</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-xl leading-relaxed text-slate-300 font-light max-w-2xl mx-auto"
          >
            المنصة التقنية لشبكة بدواي للتبرع بالدم. قاعدة بيانات آمنة، مشفرة، وسرية تماماً تهدف لتسريع الوصول للمتبرعين وإنقاذ الأرواح.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-gradient-to-r from-[#D62828] to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl px-10 h-16 text-xl font-bold shadow-[0_0_20px_rgba(214,40,40,0.4)] transition-all hover:scale-105">
                <div className="flex items-center justify-center gap-2">
                  سجل كمتبرع الآن
                  <Activity className="h-6 w-6" />
                </div>
              </Button>
            </Link>
            <Link href="#privacy" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full rounded-xl px-10 h-16 text-xl font-bold border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all hover:scale-105">
                كيف نحمي بياناتك؟
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-slate-900/50 border-y border-slate-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Heart, title: "إنقاذ الأرواح", desc: "قطرة دم واحدة تصنع فارقاً حقيقياً في حياة مريض.", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
              { icon: ShieldCheck, title: "خصوصية تامة", desc: "بياناتك مشفرة ولا تظهر للعامة بأي شكل.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
              { icon: PhoneCall, title: "تواصل منظم", desc: "الإدارة فقط هي من تتواصل معك عند الحاجة لفصيلتك.", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
              { icon: UserCheck, title: "واجب مجتمعي", desc: "بناء شبكة قوية لحماية أهالي قريتنا في الأزمات.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <Card className={`h-full border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl hover:${feature.border} transition-all duration-300 group`}>
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className={`w-20 h-20 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Privacy Guarantee */}
      <section id="privacy" className="relative z-10 py-32 bg-[#0a0f1c] overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D62828]/5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-base font-bold border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <ShieldCheck size={20} /> حماية متقدمة وتشفير تام
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                خصوصيتك في <span className="text-[#D62828]">المقام الأول</span>
              </h2>
              
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                تم بناء شبكة بدواي على أساس الثقة والسرية. لا توجد أي قوائم عامة ولا يمكن لأي شخص الاطلاع على بياناتك بأي شكل من الأشكال.
              </p>

              <ul className="space-y-6 pt-4">
                {[
                  "لا توجد خاصية للبحث أو تصفح المتبرعين للزوار.",
                  "لن يتم عرض رقم هاتفك على الموقع إطلاقاً.",
                  "نتواصل معك أولاً، ولا نشارك بياناتك للمريض إلا بموافقتك."
                ].map((text, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.15) }}
                    className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="text-slate-200 text-lg font-medium">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="w-full lg:w-[400px] shrink-0 relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D62828]/40 to-blue-600/40 blur-[80px] rounded-full"></div>
              
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-10 w-64 h-80 bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 gap-6 backdrop-blur-xl"
              >
                <div className="w-24 h-24 bg-slate-900 rounded-full border-4 border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <LockKeyhole size={48} className="text-emerald-400" />
                </div>
                <div className="text-center space-y-3 w-full">
                  <div className="h-3 bg-slate-700 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-1/2 mx-auto"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-5/6 mx-auto"></div>
                </div>
                <div className="mt-4 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-full font-bold text-sm border border-emerald-500/20">
                  بيانات مشفرة
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 bg-[#070b14] border-t border-slate-900 text-slate-500 py-10 flex flex-col items-center justify-center gap-4">
        <Droplets size={24} className="text-slate-700" />
        <p className="text-sm font-medium">
          تصميم وبرمجة :{" "}
          <a
            href="https://www.facebook.com/share/1CiZwS6Xb8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition-colors font-bold"
            dir="ltr"
          >
            MOHAMED ALGAZZAR
          </a>
        </p>
      </footer>
    </div>
  );
}
