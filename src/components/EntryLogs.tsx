"use client";

import { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { entry_schema } from "@/types";
import { formatTime } from "@/actions/convertTimeToDuration";

export const EntryLogs = ({
  publicEntries,
  privateEntries,
}: {
  publicEntries: entry_schema[];
  privateEntries: entry_schema[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <div className="text-base p-2 px-4 bg-primary text-secondary font-bold rounded-3xl">
          view logs
        </div>
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
              className="relative transform overflow-hidden rounded-3xl bg-secondary text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-secondary p-4 h-96">
                {/* content container */}
                <div className="flex h-full w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <DialogTitle
                      as="h3"
                      className="text-lg mb-4 text-center font-montserrat font-semibold text-secondaryforeground"
                    >
                      History Log
                    </DialogTitle>
                    <div className="flex flex-col gap-4 overflow-auto">
                      {publicEntries.length < 1 &&
                        privateEntries.length < 1 && (
                          <div className="self-center font-semibold text-secondaryforeground text-lg">
                            There are currently no vehicles exited yet
                          </div>
                        )}
                      {privateEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="text-lg w-full flex px-2 justify-between"
                        >
                          <div className="flex gap-4 items-center text-[--money]">
                            <ArrowRightStartOnRectangleIcon className="h-7 w-7" />
                            <div className="flex flex-col">
                              <div>
                                <span className="font-semibold font-montserrat">
                                  {entry.type} {entry.plate}
                                </span>{" "}
                                exited the{" "}
                                <span className="font-semibold font-montserrat">
                                  private
                                </span>{" "}
                                area
                              </div>
                              <div className="text-sm flex font font-montserrat font-semibold">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="h-4 w-4" />
                                  {entry.owner}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-center font-montserrat font-semibold text-base">
                            {formatTime(entry.time_exited)}
                          </div>
                        </div>
                      ))}
                      {publicEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="text-lg w-full flex px-2 justify-between"
                        >
                          <div className="flex gap-4 items-center text-[--money]">
                            <ArrowRightStartOnRectangleIcon className="h-7 w-7" />
                            <div className="flex flex-col">
                              <div>
                                <span className="font-semibold font-montserrat">
                                  {entry.type} {entry.plate}
                                </span>{" "}
                                exited the{" "}
                                <span className="font-semibold font-montserrat">
                                  public
                                </span>{" "}
                                area
                              </div>
                              <div className="text-sm flex font font-montserrat font-semibold">
                                <div className="flex items-center gap-4">
                                  <UserIcon className="h-4 w-4" />
                                  {entry.owner}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-center font-montserrat font-semibold text-base">
                            {formatTime(entry.time_exited)}
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
  );
};
