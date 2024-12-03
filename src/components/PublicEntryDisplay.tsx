"use client";

import Fuse from "fuse.js";

import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import ExitParkingButton from "@/components/ExitParkingButton";
import ParkedButton from "@/components/ParkedButton";

import { formatTime } from "@/actions/convertTimeToDuration";
import { usePolling } from "@/hooks/usePolling";
import { entry_schema } from "@/types";
import { useSearch } from "@/context/SearchContext";

export const PublicDisplay = ({ entries }: { entries: entry_schema[] }) => {
  const { query } = useSearch();

  const fuse = new Fuse(entries, {
    keys: ["owner", "plate"],
    threshold: 0.3,
  });

  const results = query
    ? fuse.search(query).map((result) => result.item)
    : entries;

  usePolling(2000);
  return (
    <>
      {results.at(0) ? (
        results.map((entry) => (
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
              <div>{entry.status}</div>
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
              <DeleteButton id={entry.id} />
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
          There are no existing entries
        </div>
      )}
    </>
  );
};
