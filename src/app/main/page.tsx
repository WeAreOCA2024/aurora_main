"use client";

import { useState } from "react";
import { MyStatusComponent } from "./components/mystatus";
import { UserTypes } from "@/types/type";
import { MyProfileListComponent } from "./components/myprofilelist";
import { FriendsListComponent } from "./components/friendslist";
import { PrimarybarComponent } from "./components/primarybar";
import DMCompornent from "./components/dm";
import Meeting from "./components/meeting";

const friends: UserTypes[] = [
  {
    id: 1,
    name: "John Doe",
    story: false,
    online: true,
    color: "red",
  },
  {
    id: 2,
    name: "Jane Doe",
    story: true,
    online: false,
    color: "red",
  },
  {
    id: 3,
    name: "John Smith",
    story: false,
    online: false,
    color: "blue",
  },
  {
    id: 4,
    name: "Jane Smith",
    story: true,
    online: true,
    color: "red",
  },
  {
    id: 5,
    name: "John Johnson",
    story: false,
    online: true,
    color: "yellow",
  },
  {
    id: 6,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 7,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 8,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 9,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 10,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 11,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 12,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 13,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 14,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 15,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 16,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 17,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 18,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 19,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 20,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 21,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 22,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 23,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 24,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 25,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 26,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 27,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 28,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 29,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 30,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 31,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 32,
    name: "Jane Johnsonafdjkashfkashdfjashldfhsdlfhsal",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 33,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 34,
    name: "Jane Johnson",
    story: false,
    online: true,
    color: "green",
  },  {
    id: 35,
    name: "Jane Johnson",
    story: true,
    online: true,
    color: "green",
  },
];

const my_profiles: UserTypes[] = [
  {
    id: 7,
    name: "Johnny Depp",
    story: true,
    online: true,
    color: "blue",
  },
  {
    id: 8,
    name: "Alex",
    story: false,
    online: true,
    color: "yellow",
  },
  {
    id: 9,
    name: "Slime",
    story: false,
    online: false,
    color: "green",
  },
  {
    id: 10,
    name: "Johnny Bravoooooo",
    story: true,
    online: true,
    color: "red",
  }
]

export default function Page() {
  const [selectedPrimaryIcon, setSelectedPrimaryIcon] = useState<string>("dm");
  const [usingProfile, setUsingProfile] = useState<UserTypes>(my_profiles[0]);
  const [selectedFriend, setSelectedFriend] = useState<UserTypes | null>(null);
  const [meetingInfo, setMeetingInfo] = useState<any>(null);


  const handleChangeProfile = (profile: UserTypes) => {
    setUsingProfile(profile);
  }

  const handleChangeSelectedFriend = (friend: UserTypes) => {
    setSelectedFriend(friend);
  }

  const createChimeMeeting = async () => {
    try {
      const response = await fetch('/api/create-chime-meeting', {
        method: 'post',
      })
      const data = await response.json();
      setMeetingInfo(data);
      console.log('MeetingInfo:', data);
    } catch(err) {
      console.error('Error Create Meeting:', err);
    }
  }

  return (
    <main className="flex">
      <section className="h-screen w-28 bg-black flex flex-col items-center gap-4 pt-8">
        <PrimarybarComponent setSelectedPrimaryIcon={setSelectedPrimaryIcon} selectedPrimaryIcon={selectedPrimaryIcon} />
        <hr className="w-2/3" />
        {friends.map((friend) => {
          if (friend.story) {
            return (
              <div className="flex items-center gap-4" key={friend.id}>
                <div className="border-2 border-green-600 iconM-frame"><div className="iconM" /></div>
              </div>
            );
          }
        })}
        <button onClick={createChimeMeeting}>Create Meeting</button>
      </section>
      <section className="h-screen w-96 bg-gray2 flex flex-col">
        <MyStatusComponent my_profile={usingProfile} />
        <MyProfileListComponent my_profiles={my_profiles} usingid={usingProfile.id} handleChangeProfile={handleChangeProfile}/>
        <div className="overflow-y-auto h-full">
          <FriendsListComponent friends={friends} selectedFriend={selectedFriend} handleChangeSelectedFriend={handleChangeSelectedFriend}/>
        </div>
      </section>
      <section className="h-screen w-full bg-Black">
        <DMCompornent />
        <Meeting />
      </section>
    </main>
  );
}