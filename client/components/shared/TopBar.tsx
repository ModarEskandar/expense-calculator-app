"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/app/context/AuthContext";


const TopBar = () => {
  const currentpath = usePathname();
  const { user } = useUserContext();

  const isActive=(linkRoute:string)=>{return currentpath === linkRoute};
  return (
    <section className="topbar p-2">
      <div className="flex-between">
      <Link
                    href='/expenses'
                    className="flex gap-2 items-center p-4"
                  >
                    <img
                      src='/assets/icons/home.svg'
                      alt='expenses'
                      className={`group-hover:invert-white ${
                        isActive('/expenses') && "invert-white"
                      }`}
                    />
                    Expenses
                  </Link>
        <div className="flex gap-4">
          
        <Link href={`/profile/${user._id}`} className="flex-center gap-4 pr-2">
            <img
              src="/assets/images/profile.png"
              alt="profile"
              className="h-14 w-14 rounded-full"
            ></img>
            <div className="flex flex-col">
            <p className="small-regular text-light-3 ">Hello</p>

              <p className="body-bold">{user.name}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
