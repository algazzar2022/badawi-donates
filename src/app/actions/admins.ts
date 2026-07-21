"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getAdmins() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isSuper: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
}

export async function addAdmin(formData: FormData) {
  const session = await auth();
  if (!session?.user?.isSuper) throw new Error("Unauthorized: Only super admin can add admins");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Missing email or password");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      isSuper: false // Only main admin is super
    }
  });

  revalidatePath("/admin/admins");
}

export async function deleteAdmin(adminId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const targetAdmin = await prisma.user.findUnique({ where: { id: adminId } });
  if (!targetAdmin) throw new Error("Admin not found");

  // Only super admin can delete accounts OR an admin deleting their own account
  // But wait, the prompt said: "ولهم كل الصلاحيات ما عادا حذف الادمن الرئيسي الوحيد الادمن الرئيسي يقدر يحذف او يعدل بياناته او بيانات الحساب الرئيسي"
  // If targetAdmin is super, only the super admin can delete it (actually super admin shouldn't be deleted, but if they want to, they can).
  if (targetAdmin.isSuper && session.user.id !== targetAdmin.id) {
    throw new Error("Cannot delete super admin");
  }

  // Only super admin can delete other admins
  if (!session.user.isSuper && session.user.id !== targetAdmin.id) {
    throw new Error("Only super admin can delete other admins");
  }

  await prisma.user.delete({
    where: { id: adminId }
  });

  revalidatePath("/admin/admins");
}
