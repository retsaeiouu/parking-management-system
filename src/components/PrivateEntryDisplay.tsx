"use client";

import { checkOverdue, formatTime } from "@/actions/convertTimeToDuration";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import ExitParkingButton from "@/components/ExitParkingButton";
import ParkedButton from "@/components/ParkedButton";

import { usePolling } from "@/hooks/usePolling";
import { entry_schema } from "@/types";

export const PrivateDisplay = ({ entries }: { entries: entry_schema[] }) => {
  usePolling(5000);
  return (
    <>
      {entries.at(0) ? (
        entries.map((entry) => (
          <div
            key={entry.id}
            className="grid grid-cols-7 text-center font-black text-lg"
          >
            <div className="col-start-1 col-end-2 self-center">
              {entry.type}
            </div>
            <div className="col-start-2 col-end-3 self-center">
              {entry.owner}
            </div>
            <div className="col-start-3 col-end-4 self-center">
              {entry.plate}
            </div>
            <div className="col-start-4 col-end-5 self-center">
              {entry.status === "Reserved" &&
                checkOverdue(entry.time_parked) && (
                  <div className="text-[--delete] rounded-3xl">Overdue</div>
                )}
              {entry.status === "Reserved" &&
                !checkOverdue(entry.time_parked) && (
                  <div className="text-[--money] rounded-3xl">
                    {entry.status}
                  </div>
                )}
              {entry.status === "Parking" && <div>{entry.status}</div>}
            </div>
            <div className="col-start-5 col-end-6 self-center">
              {formatTime(entry.time_parked)}
            </div>
            <div className="col-start-6 col-end-8 pl-3 flex justify-start gap-5 items-center">
              <EditButton
                id={entry.id}
                name={entry.owner}
                plate={entry.plate}
                type={entry.type}
              />
              {entry.status === "Reserved" ? (
                <DeleteButton id={entry.id} isReserved={true} />
              ) : (
                <DeleteButton id={entry.id} isReserved={false} />
              )}
              {entry.status === "Reserved" ? (
                <ParkedButton id={entry.id} />
              ) : (
                <ExitParkingButton id={entry.id} />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="self-center mt-4 text-xl font-bold">
          There are no entries yet
        </div>
      )}
    </>
  );
};
