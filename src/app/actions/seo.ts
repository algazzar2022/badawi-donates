"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" }
  });

  if (!settings) {
    return await prisma.siteSettings.create({
      data: { id: "default" }
    });
  }

  return settings;
}

export async function updateSiteSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const keywords = formData.get("keywords") as string;
  const ogImage = formData.get("ogImage") as string;

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      title,
      description,
      keywords,
      ogImage: ogImage || null
    },
    update: {
      title,
      description,
      keywords,
      ogImage: ogImage || null
    }
  });

  revalidatePath("/", "layout"); // Revalidate entire app layout
}
