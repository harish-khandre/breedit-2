import * as z from "zod";

export const DonateSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters required" }),
  age: z.string(),
  breed: z.string().min(3, { message: "Minimum 3 characters required" }),
  gender: z.string(),
  reason: z.string(),
  healthCondition: z.string(),
  isVaccinated: z.boolean().default(false).optional(),
  address: z.string(),
  phone: z.string().min(10, { message: "Minimum 10 characters required" }),
  image:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(File).refine((file) => file.size < 5000000, {
          message: "Image must be less than 7MB.",
        }),
});

export const OnBoardingSchema = z.object({
  petName: z.string().min(3, { message: "Minimum 3 characters required" }),
  age: z.string(),
  breed: z.string().min(3, { message: "Minimum 3 characters required" }),
  gender: z.string(),
  about: z.string(),
  image:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(File).refine((file) => file.size < 5000000, {
          message: "Image must be less than 7MB.",
        }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(3, { message: "Minimum 3 characters required" }),
    ),
    email: z.optional(z.string().email({ message: "Valid email is required" })),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password is at least 6 characters long",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, {
    message: "Password is at least 6 characters long",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(3, { message: "Minimum 3 characters required" }),
});
