import { getSiteSettings, updateSiteSettings } from "@/app/actions/seo";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Globe, Image as ImageIcon, FileText, Type } from "lucide-react";

export default async function SeoPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-400 mb-2 flex items-center gap-3">
            <Activity className="text-purple-400" size={32} />
            إعدادات الموقع (SEO)
          </h1>
          <p className="text-slate-400">
            تحكم في البيانات الوصفية والكلمات المفتاحية لموقع بدواي تتبرع لتحسين ظهوره في محركات البحث.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl">
        <form action={updateSiteSettings} className="space-y-6">
          
          <div className="space-y-4">
            <div className="grid gap-3">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Type size={16} className="text-blue-400" />
                عنوان الموقع (Title)
              </label>
              <Input 
                name="title" 
                defaultValue={settings.title} 
                required 
                className="bg-slate-950 border-slate-700 h-12 text-lg" 
              />
              <p className="text-xs text-slate-500">العنوان الذي يظهر في أعلى المتصفح وفي نتائج البحث.</p>
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-emerald-400" />
                وصف الموقع (Description)
              </label>
              <Textarea 
                name="description" 
                defaultValue={settings.description} 
                required 
                className="bg-slate-950 border-slate-700 min-h-[100px] text-lg" 
              />
              <p className="text-xs text-slate-500">وصف مختصر لغرض الموقع يجذب الزوار من محركات البحث.</p>
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Globe size={16} className="text-amber-400" />
                الكلمات المفتاحية (Keywords)
              </label>
              <Input 
                name="keywords" 
                defaultValue={settings.keywords} 
                required 
                className="bg-slate-950 border-slate-700 h-12" 
                placeholder="مثال: تبرع بالدم, بدواي, بنك الدم"
              />
              <p className="text-xs text-slate-500">افصل بين الكلمات بفاصلة (,).</p>
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <ImageIcon size={16} className="text-purple-400" />
                رابط صورة المشاركة (OG Image URL)
              </label>
              <Input 
                name="ogImage" 
                defaultValue={settings.ogImage || ""} 
                dir="ltr"
                className="bg-slate-950 border-slate-700 h-12 text-right" 
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-slate-500">الصورة التي تظهر عند مشاركة رابط الموقع على فيسبوك وتويتر وواتساب.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 h-12 text-lg w-full md:w-auto">
              حفظ الإعدادات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
