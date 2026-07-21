"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function searchDonors(formData: FormData) {
  const bloodType = formData.get("bloodType") as string;
  const isResident = formData.get("isResident") as string;

  if (!bloodType) return [];

  const whereClause: any = { bloodType };
  
  if (isResident === "yes") whereClause.isResident = true;
  else if (isResident === "no") whereClause.isResident = false;

  return await prisma.donor.findMany({
    where: whereClause,
    orderBy: { createdAt: "asc" }
  });
}

export async function updateDonorStatus(donorId: string, status: string) {
  await prisma.donor.update({
    where: { id: donorId },
    data: { status }
  });
  
  revalidatePath("/admin/request");
}
