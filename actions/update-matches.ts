"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/user-from-server";

export const updateMatches = async (matchedUserId: string) => {
  const user = await currentUser();

  try {
    if (user && user.id) {
      await db.pet.update({
        where: { id: user.id },
        data: {
          matches: { push: matchedUserId },
        },
      });
    }
    return { success: "Matched user updated!" };
  } catch (error) {
    console.error(error);
  }
};
