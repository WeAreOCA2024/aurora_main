import { UserTypes } from "@/types/type";

export const MyStatusComponent = ({ my_profile }: { my_profile: UserTypes }) => {
  return (
    <div className="flex justify-center">
      <div className={`w-80 px-4 mx-4 mt-8 h-20 rounded-3xl bg-${my_profile.color}-500 flex items-center`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`iconL-frame ${my_profile.story && "border-2 border-green-700"}`}><div className="iconL"/></div>
            <div className="ml-4">
              <p className="text-white font-bold text-xl">{my_profile.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};