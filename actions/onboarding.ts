"use server";
import * as z from "zod";
import { OnBoardingSchema } from "@/types/index";

export const onboarding = async (values: z.infer<typeof OnBoardingSchema>) => {
  const validatedFields = OnBoardingSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  // send data in try catch

  try {
    console.log(values);
    return { success: "success" };
  } catch (error) {
    return { error: "error" };
  }
  // send data to db
};
