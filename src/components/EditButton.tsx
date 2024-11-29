"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import EditForm from "./EditForm";

export default function EditButton({ id, name, plate, type }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <PencilIcon className="transition-all duration-200 ease-in-out h-6 w-6 hover:scale-[1.2]" />
      </button>
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
                      Edit Entry
                    </DialogTitle>
                    <PencilIcon className="h-5 w-5" />
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <EditForm
                      setOpen={setOpen}
                      id={id}
                      name={name}
                      plate={plate}
                      type={type}
                    />
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
