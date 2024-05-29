"use server";

import * as z from "zod";
import { OnBoardingSchema } from "@/types/index";
import { uploadFileToS3 } from "./upload-image";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user-from-server";

export const onboarding = async (values: z.infer<typeof OnBoardingSchema>) => {
  console.log(values);
  const validatedFields = OnBoardingSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const userId = user.id as string;

  const { petName, age, about, breed, gender, image } = validatedFields.data;
  console.log(image, petName);

  /* const imageUrl = await uploadFileToS3(image);

  if (!imageUrl) {
    return { error: "Invalid image!" };
  } */

  try {
    /* await db.pet.create({
      data: {
        userId,
        petName,
        age,
        about,
        breed,
        gender,
        image: imageUrl,
      },
    }); */

    return { success: "Pet data saved successfully" };
  } catch (error) {
    return { error: "An error occurred while saving pet data" };
  }
};
