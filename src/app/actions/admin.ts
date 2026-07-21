"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";

export async function searchDonors(formData: FormData) {
  const bloodType = formData.get("bloodType") as string;
  const isResident = formData.get("isResident") as string;

  if (!bloodType) return [];

  const whereClause: Prisma.DonorWhereInput = { bloodType };
  
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

export async function updateDonorDetails(donorId: string, data: Record<string, unknown>) {
  const name = data.name as string;
  const age = data.age as string | number;
  const bloodType = data.bloodType as string;
  const phone = data.phone as string;
  const address = data.address as string;
  const isResident = data.isResident;
  const lastDonation = data.lastDonation as string;
  const hasDiseases = data.hasDiseases;
  const diseasesList = data.diseasesList as string | null;
  
  await prisma.donor.update({
    where: { id: donorId },
    data: {
      name,
      age: typeof age === "string" ? parseInt(age) : age as number,
      bloodType,
      phone,
      address,
      isResident: isResident === "yes" || isResident === true,
      lastDonation,
      hasDiseases: hasDiseases === "yes" || hasDiseases === true,
      diseasesList: (hasDiseases === "yes" || hasDiseases === true) ? diseasesList : null,
    }
  });
  
  revalidatePath("/admin/donors");
  revalidatePath("/admin/request");
}

export async function deleteDonor(donorId: string) {
  await prisma.donor.delete({
    where: { id: donorId }
  });
  revalidatePath("/admin/donors");
  revalidatePath("/admin/request");
}
