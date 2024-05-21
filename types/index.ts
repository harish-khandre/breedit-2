import * as z from "zod";

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
