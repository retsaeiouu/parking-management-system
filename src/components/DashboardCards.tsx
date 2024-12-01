"use client";

import { UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { usePathname } from "next/navigation";

export const PrivateCard = ({ count }: { count: number }) => {
  const path = usePathname();

  return (
    <Link
      href="/dashboard/private"
      className={`
        hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 ease-in-out flex justify-center items-center col-span-1 rounded-3xl
        ${path !== "/dashboard/private" ? "bg-secondary text-secondaryforeground" : "drop-shadow-xl bg-primary text-secondary"}
      `}
    >
      <UserIcon height="5rem" width="5rem" className="mr-20" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="font-bold tracking-wider text-5xl font-montserrat">
            {count}/30
          </div>
          <div className="font-bold tracking-wider text-2xl font-montserrat">
            space available
          </div>
        </div>
        <div className="font-semibold text-xl tracking-wide">
          Private Parking Area
        </div>
      </div>
    </Link>
  );
};

export const PublicCard = ({ count }: { count: number }) => {
  const path = usePathname();

  return (
    <Link
      href="/dashboard"
      className={`
        hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 ease-in-out flex justify-center items-center col-span-1 rounded-3xl
        ${path !== "/dashboard" ? "bg-secondary text-secondaryforeground" : "drop-shadow-xl bg-primary text-secondary"}
      `}
    >
      <UserGroupIcon height="5rem" width="5rem" className="mr-20" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="font-bold tracking-wider text-5xl font-montserrat">
            {count}/50
          </div>
          <div className="font-bold tracking-wider text-2xl font-montserrat">
            space available
          </div>
        </div>
        <div className="font-semibold text-xl tracking-wide">
          Public Parking Area
        </div>
      </div>
    </Link>
  );
};
