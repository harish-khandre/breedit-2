"use client"
import { SwipeUsers, getOpositeGenderUsers } from "@/actions/swipe";
import { updateMatches } from "@/actions/update-matches";
import { currentUser } from "@/lib/user-from-server";
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

const swiped = (direction: string, swipedUserId: string) => {
  if (direction === "right") {
    updateMatches(swipedUserId);
  }
};

const outOfFrame = (name: string) => {
  console.log(`${name} left the screen!`);
};

export const SwipeCard = () => {

  const [filteredGenderedUsers,setFilteredGenderedUsers] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SwipeUsers();
        setFilteredGenderedUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard overflow-hidden">
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.length === 0 && <div>No users left</div>}
          {filteredGenderedUsers?.map((genderedUser: any) =>
            genderedUser && genderedUser.userId ? (
              <TinderCard
                className="swipe"
                key={genderedUser.userId}
                onSwipe={(dir) => swiped(dir, genderedUser.userId)}
                onCardLeftScreen={() => outOfFrame(genderedUser.petName)}
              >
                <div className="card">
                  <h3 className="text-end font-[Oswald] font-thin tracking-wide text-lg text-[#f7ebdb] p-4 drop-shadow-2xl antialiased">
                    {genderedUser.petName}
                  </h3>
                </div>
              </TinderCard>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};
