"use client";

import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
// import { LoadingOutlined } from "@ant-design/icons";

interface User {
  gender_interest: string | null;
  matches: { user_id: string }[];
}

interface GenderedUser {
  user_id: string;
  first_name: string;
}

import ChatContainer from "./ChatContainer";
import { useCurrentUser } from "@/hooks/use-current-user";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [genderedUsers, setGenderedUsers] = useState<GenderedUser[] | null>(
    null,
  );
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  const userId = useCurrentUser()?.id;

  const getUser = async () => {
    try {
      /* const response = await axios.get<User>("/api/user", {
        params: { userId },
        next: {
          revalidate: 10,
        },
      });
      setUser(response.data); */
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      /* if (
        user?.gender_interest === null ||
        user?.gender_interest === undefined
      ) {
        return;
      } else {
        const response = await axios.get<GenderedUser[]>(
          "/api/gendered-users",
          {
            params: { gender: user?.gender_interest },
            next: {
              revalidate: 10,
            },
          },
        );
        setGenderedUsers(response.data); */
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  const updateMatches = async (matchedUserId: string) => {
    try {
      await axios.put("/api/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction: string, swipedUserId: string) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    ?.map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter((genderedUser) => {
    return (
      genderedUser &&
      genderedUser.user_id &&
      !matchedUserIds?.includes(genderedUser.user_id)
    );
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return isTabletOrMobile ? (
    <MobileUsers />
  ) : (
    <>
      {user && (
        <div className="dashboard overflow-hidden ">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers?.map(
                (genderedUser) =>
                  genderedUser && genderedUser.user_id ? ( // Check if genderedUser and user_id are present
                    <TinderCard
                      className="swipe"
                      key={genderedUser.user_id}
                      onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                      onCardLeftScreen={() =>
                        outOfFrame(genderedUser.first_name)
                      }
                    >
                      <div className="card">
                        <h3 className="text-end font-[Oswald] font-thin tracking-wide text-lg text-[#f7ebdb] p-4 drop-shadow-2xl antialiased ">
                          {genderedUser.first_name}
                        </h3>
                      </div>
                    </TinderCard>
                  ) : null, // Return null if genderedUser or user_id is missing
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
