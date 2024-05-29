"use server";

import * as z from "zod";
import { DonateSchema } from "@/types/index";
import { uploadFileToS3 } from "./upload-image";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user-from-server";

export const donate = async (
  values: z.infer<typeof DonateSchema>,
): Promise<{ success: string } | { error: string }> => {
  const validatedFields = DonateSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const userId = user.userId;
  const { petName, age, about, breed, gender, image, number } = validatedFields.data;

  try {
    const imageUrl = await uploadFileToS3(image);
    if (!imageUrl) {
      return { error: "Invalid image!" };
    }

    await db.pet.create({
      data: {
        userId,
        petName,
        age,
        about,
        breed,
        gender,
        number,
        image: imageUrl,
      },
    });

    return { success: "Pet data saved successfully" };
  } catch (error) {
    console.error("Error saving pet data:", error);
    return { error: "An error occurred while saving pet data" };
  }
};
