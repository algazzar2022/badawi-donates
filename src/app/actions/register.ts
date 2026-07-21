"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون أكثر من حرفين"),
  age: z.coerce.number().min(18, "يجب أن يكون العمر 18 عاماً أو أكثر").max(65, "يجب أن لا يزيد العمر عن 65 عاماً"),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    message: "يرجى اختيار فصيلة الدم",
  }),
  address: z.string().min(3, "يرجى كتابة العنوان بالتفصيل"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
  isResident: z.enum(["yes", "no"]),
  lastDonation: z.enum(["less_than_4", "more_than_4"]),
  hasDiseases: z.enum(["yes", "no"]),
  diseasesList: z.string().optional(),
});

export async function registerDonor(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      age: formData.get("age"),
      bloodType: formData.get("bloodType"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      isResident: formData.get("isResident"),
      lastDonation: formData.get("lastDonation"),
      hasDiseases: formData.get("hasDiseases"),
      diseasesList: formData.get("diseasesList"),
    };

    const validatedData = registerSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "يرجى التأكد من إدخال البيانات بشكل صحيح.",
      };
    }

    const { name, age, bloodType, address, phone, isResident, lastDonation, hasDiseases, diseasesList } = validatedData.data;

    await prisma.donor.create({
      data: {
        name,
        age,
        bloodType,
        address,
        phone,
        isResident: isResident === "yes",
        lastDonation,
        hasDiseases: hasDiseases === "yes",
        diseasesList: hasDiseases === "yes" ? diseasesList : null,
      },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "شكراً لتسجيلك. تم حفظ بياناتك بشكل آمن. لن يتم مشاركة أي بيانات إلا بعد موافقتك الشخصية.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى لاحقاً.",
    };
  }
}
