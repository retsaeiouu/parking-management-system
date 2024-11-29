"use client";

import { useActionState, useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { login } from "@/actions/loginAction";
import { useFormStatus } from "react-dom";

export const LoginForm = () => {
  const [toggle, setToggle] = useState(false);
  const [result, action] = useActionState(login, null);

  return (
    <div className="relative h-[26rem] w-[50%] bg-secondary rounded-3xl drop-shadow-2xl">
      <form
        className="flex flex-col h-full p-8 gap-3 text-2xl font-montserrat"
        action={action}
      >
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-4xl">Login</div>
          <div className="h-8 w-full">
            {result && (
              <div className="bg-[--delete] rounded-xl h-full w-full flex items-center pl-5 text-lg text-secondary">
                {result.error}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-secondaryforeground"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-background focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary w-full">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  className="text-lg block flex-1 border-0 bg-transparent py-1.5 pl-4 text-foreground placeholder:text-gray-400 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-secondaryforeground"
            >
              Password
            </label>
            <div className="mt-2">
              <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-background focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary w-full">
                <input
                  id="password"
                  name="password"
                  type={toggle ? "text" : "password"}
                  placeholder="password"
                  className="text-lg block flex-1 border-0 bg-transparent py-1.5 pl-4 text-foreground placeholder:text-gray-400 focus:ring-0"
                />
              </div>
            </div>
          </div>
          {toggle ? (
            <div onClick={() => setToggle(false)}>
              <EyeIcon className="absolute right-[6.5%] z-2 bottom-[32.5%] text-foreground h-7 w-7" />
            </div>
          ) : (
            <div onClick={() => setToggle(true)}>
              <EyeSlashIcon className="absolute right-[6.5%] z-2 bottom-[32.5%] text-foreground h-7 w-7" />
            </div>
          )}
        </div>
        <LoginButton />
      </form>
    </div>
  );
};

const LoginButton = () => {
  const status = useFormStatus();
  return (
    <>
      {status.pending ? (
        <button
          className="mt-auto bg-primary text-secondary font-semibold w-full rounded-3xl p-2 opacity-60 hover:bg-[#59639c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          disabled
        >
          Logging in...
        </button>
      ) : (
        <button
          type="submit"
          className="mt-auto bg-primary text-secondary font-semibold w-full rounded-3xl p-2 hover:bg-[#59639c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Login
        </button>
      )}
    </>
  );
};
