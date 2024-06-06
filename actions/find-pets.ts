import { db } from "@/lib/db";
import { Donate } from "@prisma/client";

export const findPets = async () => {
  const data = await db.donate.findMany();
  return data
};
