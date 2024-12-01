"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { markParkedPrivate, markParkedPublic } from "@/actions/markParked";

export default function ParkedButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const markAction =
    path === "/dashboard" ? markParkedPublic : markParkedPrivate;
  const router = useRouter();

  return (
    <>
      <button
        className="transition-all duration-200 ease-out hover:scale-[1.03] active:scale-95 flex gap-2 bg-gray-500 ml-auto text-secondary rounded-3xl px-4 py-2 items-center"
        onClick={() => setOpen(true)}
      >
        mark as parked
        <MinusCircleIcon className="text-secondary h-5 w-5" />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-3xl bg-secondary text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-secondary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-500 sm:mx-0 sm:size-10">
                    <MinusCircleIcon
                      aria-hidden="true"
                      className="size-6 text-secondary"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-montserrat font-semibold text-foreground"
                    >
                      Mark as Parked
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-base text-secondaryforeground">
                        Are you sure you want to mark this entry as parked? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={async () => {
                    await markAction(id);
                    router.refresh();
                    setOpen(false);
                  }}
                  className="transition-all duration-200 ease-out active:scale-90 inline-flex w-full justify-center rounded-3xl bg-gray-500 px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="opacity-70 mt-3 inline-flex w-full justify-center px-3 py-2 text-base font-montserrat font-semibold text-gray-900 sm:mt-0 sm:w-auto"
                >
                  cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
