"use client";

import {
  checkOverdue,
  formatTime,
  getTimeLeft,
} from "@/actions/convertTimeToDuration";
import { usePolling } from "@/hooks/usePolling";
import { entry_schema } from "@/types";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ClockIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const ReservationDisplay = ({
  entry,
}: {
  entry: entry_schema | null;
}) => {
  usePolling(2000);
  return (
    <div className="flex flex-col gap-2 my-auto">
      {entry && (
        <>
          <div className="flex items-center gap-4">
            <UserIcon className="h-7 w-7" />
            <div className="font-black">{entry.owner}</div>
          </div>
          <div className="flex items-center gap-4">
            <PhoneIcon className="h-7 w-7" />
            <div className="font-black">{entry.contact}</div>
          </div>
          <div className="flex items-center gap-4">
            <KeyIcon className="h-7 w-7" />
            <div className="font-black">
              {entry.type} {entry.plate}
            </div>
          </div>
          {entry.status === "Pending" && (
            <div className="text-[--warn] flex items-center gap-4">
              <ArrowPathIcon className="animate-spin h-7 w-7" />
              <div className="font-black">{entry.status}</div>
            </div>
          )}
          {entry.status === "Reserved" && (
            <>
              {checkOverdue(entry.time_parked) ? (
                <div className="text-[--delete] flex items-center gap-4 font-montserrat font-semibold">
                  <ExclamationCircleIcon className="h-7 w-7" />
                  <div>Overdue</div>
                </div>
              ) : (
                <div className="text-[--money] flex items-center gap-4 font-montserrat font-semibold">
                  <ClockIcon className="h-7 w-7" />
                  <div>{getTimeLeft(entry.time_parked)}</div>
                </div>
              )}
            </>
          )}
          {entry.status === "Parking" && (
            <div className="text-primary flex items-center gap-4">
              <ArrowDownCircleIcon className="h-7 w-7" />
              <div className="font-black">
                <span className="font-semibold font-montserrat">Parked</span>{" "}
                {formatTime(entry.time_parked)}
              </div>
            </div>
          )}
          {entry.status === "Rejected" && (
            <div className="text-[--delete] flex items-center gap-4">
              <ExclamationCircleIcon className="h-7 w-7" />
              <div className="font-black">{entry.status}</div>
            </div>
          )}
          {entry.status === "Exited" && (
            <div className="flex items-center gap-4">
              <InformationCircleIcon className="h-7 w-7" />
              <div className="font-black">{entry.status}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
