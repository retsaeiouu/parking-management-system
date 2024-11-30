"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { exitPrivateEntry, exitPublicEntry } from "@/actions/editEntries";

export default function ExitParkingButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const action = path === "/dashboard" ? exitPublicEntry : exitPrivateEntry;
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="transition-all duration-200 ease-in-out hover:scale-[1.04] flex gap-2 bg-[--money] ml-auto text-secondary rounded-3xl px-8 py-2 items-center"
      >
        exit parking
        <ArrowRightStartOnRectangleIcon className="text-secondary h-6 w-6" />
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
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-[--money] sm:mx-0 sm:size-10">
                    <ArrowRightStartOnRectangleIcon
                      aria-hidden="true"
                      className="size-6 text-secondary"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-montserrat font-semibold text-foreground"
                    >
                      Exit Parking Entry
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-base text-secondaryforeground">
                        Are you sure you want to mark this entry as exited? This
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
                    await action(id);
                    router.refresh();
                    setOpen(false);
                  }}
                  className="inline-flex w-full justify-center rounded-3xl bg-[--money] px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center px-3 py-2 text-base font-montserrat font-semibold text-gray-900 sm:mt-0 sm:w-auto"
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
