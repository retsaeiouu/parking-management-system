"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { deletePrivateEntry, deletePublicEntry } from "@/actions/deleteEntries";
import { usePathname, useRouter } from "next/navigation";
import { rejectReservation } from "@/actions/editEntries";

export default function DeleteButton({
  id,
  isReserved,
}: {
  id: number;
  isReserved: boolean;
}) {
  const [open, setOpen] = useState(false);
  const url = usePathname();
  let deleteAction =
    url === "/dashboard/private" ? deletePrivateEntry : deletePublicEntry;
  if (isReserved) deleteAction = rejectReservation;
  const router = useRouter();

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <TrashIcon className="transition-all duration-200 ease-in-out text-[--delete] h-6 w-6 hover:scale-[1.2]" />
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
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-[--delete] sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-secondary"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-montserrat font-semibold text-foreground"
                    >
                      Delete Parking Entry
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-base text-secondaryforeground">
                        Are you sure you want to delete this entry? All of this
                        entry&apos;s data will be permanently removed. This
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
                    await deleteAction(id);
                    router.refresh();
                    setOpen(false);
                  }}
                  className="inline-flex w-full justify-center rounded-3xl bg-[--delete] px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto"
                >
                  Delete
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
