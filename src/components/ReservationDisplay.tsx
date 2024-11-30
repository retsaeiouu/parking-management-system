"use client";

import { checkOverdue, formatTime } from "@/actions/convertTimeToDuration";
import { usePolling } from "@/hooks/usePolling";
import { entry_schema } from "@/types";

export const ReservationDisplay = ({
  entry,
}: {
  entry: entry_schema | null;
}) => {
  usePolling(5000);
  return (
    <div className="flex flex-col gap-2 my-auto">
      {entry && entry.status === "Pending" && (
        <>
          <div>Name: {entry.owner}</div>
          <div>Contact Number: {entry.contact}</div>
          <div>Vehicle Type: {entry.type}</div>
          <div>Plate Number: {entry.plate}</div>
          <div>
            Status:{" "}
            <span className="text-[--warn] font-black">{entry.status}</span>
          </div>
        </>
      )}
      {entry && entry.status === "Rejected" && (
        <>
          <div>Name: {entry.owner}</div>
          <div>Vehicle Type: {entry.type}</div>
          <div>Plate Number: {entry.plate}</div>
          <div>
            Status:{" "}
            <span className="font-black text-[--delete]">{entry.status}</span>
          </div>
        </>
      )}
      {entry && entry.status === "Parking" && (
        <>
          <div>Name: {entry.owner}</div>
          <div>Vehicle Type: {entry.type}</div>
          <div>Plate Number: {entry.plate}</div>
          <div>
            Status:{" "}
            <span className="font-black text-primary">{entry.status}</span>
          </div>
          <div>Duration: {formatTime(entry?.time_parked)}</div>
        </>
      )}
      {entry && entry.status === "Reserved" && (
        <>
          <div>Name: {entry.owner}</div>
          <div>Vehicle Type: {entry.type}</div>
          <div>Plate Number: {entry.plate}</div>
          <div>
            Status:{" "}
            {checkOverdue(entry.time_parked) ? (
              <span className="text-[--delete] font-black">Overdue</span>
            ) : (
              <span className="text-[--money] font-black">{entry.status}</span>
            )}{" "}
            <span className="font-semibold font-montserrat text-secondaryforeground">
              2 hours only
            </span>
          </div>
          <div>Duration: {formatTime(entry?.time_parked)}</div>
        </>
      )}
    </div>
  );
};
