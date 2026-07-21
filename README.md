# شبكة بدواي للتبرع بالدم (Badawi Blood Network)

تم تصميم وبرمجة هذا النظام بالكامل بواسطة **MOHAMED ALGAZZAR**.

يهدف هذا النظام إلى بناء قاعدة بيانات قوية وموثوقة وسرية جداً للمتبرعين بالدم في قرية بدواي، للمساعدة في إنقاذ الأرواح بشكل سريع وفعال دون المساس بخصوصية المتبرعين.

## المطور
**MOHAMED ALGAZZAR**
- [التواصل عبر فيسبوك](https://www.facebook.com/share/1CiZwS6Xb8/)

## التقنيات المستخدمة
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Prisma ORM
- SQLite (Development)
- NextAuth.js (Authentication)
- Framer Motion (Animations)

## كيفية التشغيل (للمطورين)
```bash
# تثبيت الحزم
npm install

# تشغيل قاعدة البيانات وإعدادها
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# تشغيل السيرفر المحلي
npm run dev
```

جميع الحقوق محفوظة للمطور.
