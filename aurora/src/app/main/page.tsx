"use client";

import { useState } from "react";
import { MyStatusComponent } from "./components/mystatus";
import { UserTypes } from "@/types/type";
import { MyProfileListComponent } from "./components/myprofilelist";

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

  // arrow function
  const PrimaryIcons = ({ name, icon }: { name: string; icon: string }) => {
    return (
      <p
        className={`text-3xl w-14 h-14 border-2 ${name !== selectedPrimaryIcon ? "border-neutral-600" : "border-white"} rounded-2xl flex justify-center items-center text-white`}
        onClick={() => {setSelectedPrimaryIcon(name)}}
      >
        {icon}
      </p>
    );
  };

  return (
    <main className="flex">
      <section className="h-screen w-28 bg-Black flex flex-col items-center gap-4 pt-8">
        <PrimaryIcons name="dm" icon="📩" />
        <PrimaryIcons name="server" icon="👥" />
        <PrimaryIcons name="notification" icon="📁" />
        <PrimaryIcons name="add_server" icon="十" />
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
      </section>
      <section className="h-screen max-w-96 bg-Gray2">
        <MyStatusComponent my_profile={usingProfile} />
        <div className="overflow-scroll">
          <MyProfileListComponent my_profiles={my_profiles} usingid={usingProfile.id}/>
        </div>
      </section>
      <section className="h-screen w-full bg-Black">

      </section>
    </main>
  );
}