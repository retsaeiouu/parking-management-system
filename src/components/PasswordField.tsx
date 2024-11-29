"use client";

import { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export const PasswordField = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="text-xl">Password</div>
        <input
          type={toggle ? "text" : "password"}
          name="password"
          placeholder="enter password"
          className="text-lg border-b-2 border-secondaryforeground bg-secondary w-full px-3 py-1 outline-none"
        />
      </div>
      {toggle ? (
        <div onClick={() => setToggle(false)}>
          <EyeIcon className="absolute right-[5%] z-2 bottom-[36%] text-foreground h-7 w-7" />
        </div>
      ) : (
        <div onClick={() => setToggle(true)}>
          <EyeSlashIcon className="absolute right-[5%] z-2 bottom-[36%] text-foreground h-7 w-7" />
        </div>
      )}
    </>
  );
};
