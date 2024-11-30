"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { entry_schema } from "@/types";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { acceptReservation, rejectReservation } from "@/actions/editEntries";

export const NotificationIcon = ({
  reservations,
}: {
  reservations: entry_schema[];
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      {reservations.length > 0 ? (
        <>
          <button onClick={() => setOpen(true)}>
            <BellAlertIcon className="animate-swing text-secondaryforeground h-7 w-7" />
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
                  className="relative transform overflow-hidden rounded-3xl bg-secondary text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-secondary p-4 h-96">
                    {/* content container */}
                    <div className="flex h-full w-full">
                      <div className="flex flex-col gap-2 text-center w-full">
                        <DialogTitle
                          as="h3"
                          className="text-lg mb-4 font-montserrat font-semibold text-secondaryforeground"
                        >
                          Reservations
                        </DialogTitle>
                        <div className="flex flex-col gap-2 overflow-auto">
                          <div className="grid grid-cols-5 mb-4">
                            <div className="col-span-1">Type</div>
                            <div className="col-span-1">Name</div>
                            <div className="col-span-1">Contact</div>
                            <div className="col-span-1">Plate No.</div>
                            <div className="col-span-1">Actions</div>
                          </div>
                          {reservations.map((reservation) => (
                            <div
                              key={reservation.id}
                              className="grid grid-cols-5 w-full font-black tracking-wide"
                            >
                              <div className="self-center col-span-1">
                                {reservation.type}
                              </div>
                              <div className="self-center col-span-1">
                                {reservation.owner}
                              </div>
                              <div className="self-center col-span-1">
                                {reservation.contact}
                              </div>
                              <div className="self-center col-span-1">
                                {reservation.plate}
                              </div>
                              <div className="col-span-1 flex justify-center items-center gap-4">
                                <button
                                  onClick={async () => {
                                    await rejectReservation(reservation.id);
                                    router.refresh();
                                  }}
                                >
                                  <XMarkIcon className="h-7 w-7 text-secondary bg-[--delete] p-1 rounded-full" />
                                </button>
                                <button
                                  onClick={async () => {
                                    await acceptReservation(reservation.id);
                                    router.refresh();
                                  }}
                                >
                                  <CheckIcon className="h-7 w-7 text-secondary bg-[--money] p-1 rounded-full" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="absolute top-[3%] right-[2%]"
                  >
                    <XMarkIcon className="h-7 w-7 text-secondaryforeground" />
                  </button>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <>
          <button onClick={() => setOpen(true)}>
            <BellIcon className="text-secondaryforeground h-7 w-7" />
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
                  className="relative transform overflow-hidden rounded-3xl bg-secondary text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-secondary p-4 h-96">
                    {/* content container */}
                    <div className="flex h-full w-full">
                      <div className="flex flex-col gap-2 text-center w-full">
                        <DialogTitle
                          as="h3"
                          className="text-lg mb-4 font-montserrat font-semibold text-secondaryforeground"
                        >
                          Reservations
                        </DialogTitle>
                        <div className="flex flex-col gap-2 overflow-auto">
                          <div className="grid grid-cols-5 mb-4">
                            <div className="col-span-1">Type</div>
                            <div className="col-span-1">Name</div>
                            <div className="col-span-1">Contact</div>
                            <div className="col-span-1">Plate No.</div>
                            <div className="col-span-1">Actions</div>
                          </div>
                          <div className="text-lg font-black">
                            There are no reservations yet
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="absolute top-[3%] right-[2%]"
                  >
                    <XMarkIcon className="h-7 w-7 text-secondaryforeground" />
                  </button>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
};
