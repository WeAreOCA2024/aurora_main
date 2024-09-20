"use client"

import React, { useState } from 'react'
import { PrimarybarComponent } from '../main/components/primarybar'
import { UserTypes } from '@/types/type';
import { MyStatusComponent } from '../main/components/mystatus';
import { MyProfileListComponent } from '../main/components/myprofilelist';
import { FriendsListComponent } from '../main/components/friendslist';
import DMCompornent from '../main/components/dm';
import Server1 from '@/assets/svg/server1.svg';
import { WidthIcon } from '@radix-ui/react-icons';

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

const Page = () => {
    const [selectedPrimaryIcon, setSelectedPrimaryIcon] = useState<string>("dm");
    const [usingProfile, setUsingProfile] = useState<UserTypes>(my_profiles[0]);
    const [selectedFriend, setSelectedFriend] = useState<UserTypes | null>(null);


    const handleChangeProfile = (profile: UserTypes) => {
        setUsingProfile(profile);
      }
    
      const handleChangeSelectedFriend = (friend: UserTypes) => {
        setSelectedFriend(friend);
      }
    return (
        <main className="flex w-full bg-black">
            <section className="h-screen w-20 flex flex-col items-center gap-4 pt-8">
            <PrimarybarComponent setSelectedPrimaryIcon={setSelectedPrimaryIcon} selectedPrimaryIcon={selectedPrimaryIcon} />
            <hr className="w-2/3" />
            <Server1 />
            </section>
            <section className='my-auto bg-gray2 rounded-lg' style={{ width: "1400px" ,height: "1000px"}}>                
                <section className='my-auto justify-end bg-black rounded-lg' style={{width: "900px",height: "950px"}}>
                </section>
            </section>
      </main>
    )
}

export default Page