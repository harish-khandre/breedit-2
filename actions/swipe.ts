"use server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user-from-server";
import { User } from "@prisma/client";

const matchedUsers = async (userId: string | undefined) => {
  const users = await db.pet.findMany({
    where: {
      userId,
    },
    select: {
      matches: true,
    },
  });
  return users;
};

export const getOpositeGenderUsers = async (userId: string | undefined) => {

  const user = await currentUser();

  const userPet = await db.pet.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (!userPet) {
    return [];
  }

  const result = await db.pet.findMany({
    where: {
      gender: {
        not: userPet.gender,
      },
    },
  });
  return result;
};

export const SwipeUsers = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "User not found" };
  }
  const userId = user.id;

  const genderedUsers = await getOpositeGenderUsers(userId);
  const matchedUser = await matchedUsers(userId);

  const filterUsers = (genderedUsers: any, matchedUsers: any) => {
    return genderedUsers.filter((user: any) => {
      const isMatched = matchedUsers.some((matchedUser: any) =>
        matchedUser.matches.includes(user.id),
      );
      return !isMatched;
    });
  };

  const filteredGenderedUsers = filterUsers(genderedUsers, matchedUser);
  return filteredGenderedUsers;
};
