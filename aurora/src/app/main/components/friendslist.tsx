import { UserTypes } from "@/types/type"

interface FriendsListProps{
  friends: UserTypes[];
  selectedFriend: UserTypes | null;
  handleChangeSelectedFriend: (friend:UserTypes) => void;
}

export const FriendsListComponent = ({friends,selectedFriend,handleChangeSelectedFriend}:FriendsListProps) => {
  return(
    <div className="">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className={`flex items-center gap-3 px-6 mx-6 py-3 rounded-lg ${selectedFriend?.id == friend.id ? "bg-neutral-600" : "hover:bg-neutral-700"}`} 
          onClick={() => handleChangeSelectedFriend(friend)}
        >
          <div className={`border-2 ${friend.story ? "border-green-600" : "border-white"} iconM-frame`}>
            <div className="iconM"/>
          </div>
          <p className="text-white truncate">{friend.name}</p>
        </div>
      ))}
    </div>
  )
}