"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[150px] rounded-full z-0 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 text-blue-500 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white">تسجيل دخول الإدارة</h1>
        </div>

        <Card className="shadow-2xl border-slate-800 bg-slate-900/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardDescription className="text-slate-400">
              هذه الصفحة مخصصة لمديري النظام فقط
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  required
                  className="h-12 bg-slate-950/50 border-slate-700 text-white focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">كلمة المرور</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  dir="ltr"
                  required
                  className="h-12 bg-slate-950/50 border-slate-700 text-white focus-visible:ring-blue-500"
                />
              </div>
              
              {errorMessage && (
                <div className="p-3 bg-red-900/30 border border-red-800 text-red-400 rounded-lg text-sm text-center">
                  {errorMessage}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                {isPending ? "جاري التحقق..." : "دخول"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
