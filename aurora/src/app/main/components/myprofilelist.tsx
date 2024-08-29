import { UserTypes } from "@/types/type";

interface MyProfileListComponentProps {
  my_profiles: UserTypes[];
  usingid: number;
}


export const MyProfileListComponent = ({ my_profiles,usingid }: MyProfileListComponentProps) => {
  return(
    <div className="flex justify-center">
      <div className="flex my-3 gap-6 w-9/12 overflow-x-scroll pt-3 pb-5">
        {my_profiles.map((my_profile) => (
          <div key={my_profile.id} className={`min-w-20 h-20 rounded-3xl bg-${my_profile.color}-500 flex flex-col items-center justify-center ${my_profile.id == usingid && "border-2 border-neutral-100"}`}>
            <div className="flex items-center justify-center w-full px-2 flex-col">
              <div className={`iconS-frame ${my_profile.story && "border-2 border-green-700"} flex items-center justify-center`}>
                <div className="iconS"/>
              </div>
              <p className="text-white font-bold text-xs truncate max-w-full text-left px-2">{my_profile.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}