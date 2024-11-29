"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateForm from "./CreateForm";
import { usePathname } from "next/navigation";

export default function CreateButton({
  pubCount,
  priCount,
}: {
  pubCount: number;
  priCount: number;
}) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const cap = path === "/dashboard" ? 50 : 30;
  const count = path === "/dashboard" ? pubCount : priCount;
  const isFull = count >= cap;
  console.log(isFull);

  return (
    <>
      {isFull ? (
        <button
          onClick={() => setOpen(true)}
          disabled
          className="transition-all duration-200 ease-in-out flex items-center gap-2 bg-[--delete] text-secondary font-montserrat font-semibold p-2 px-10 rounded-3xl"
        >
          full
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="transition-all duration-200 ease-in-out hover:scale-[1.04] flex items-center gap-2 bg-primary text-secondary font-montserrat font-semibold p-2 px-4 rounded-3xl"
        >
          create
          <PlusIcon className="h-6 w-6" />
        </button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild></TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6 flex items-center gap-2 text-foreground">
                    <DialogTitle className="text-xl font-bold">
                      Create Entry
                    </DialogTitle>
                    <PlusIcon className="h-5 w-5" />
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <CreateForm setOpen={setOpen} />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
