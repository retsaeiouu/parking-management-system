import { getReservationEntry } from "@/actions/getEntries";
import {
  CancelButton,
  Exit,
  ReservationExitButton,
} from "@/components/ReservationCancelButton";
import { ReservationDisplay } from "@/components/ReservationDisplay";
import { entry_schema } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("reservationcookie");
  if (!hasCookie) redirect("/");

  const entry: entry_schema | null = await getReservationEntry(
    cookieStore.get("reservationcookie")?.value,
  );

  return (
    <div className="flex flex-col gap-2 text-lg p-6 h-96 w-[90%] lg:w-[50%] bg-secondary rounded-3xl drop-shadow-2xl">
      <div className="text-3xl lg:text-4xl font-bold max-sm:self-center mb-2">
        My Reservation
      </div>
      {entry?.status === "Pending" && (
        <div className="self-center w-full text-[--warn] font-bold font-montserrat tracking-wide p-1 rounded-3xl text-center">
          Waiting for approval
        </div>
      )}
      {entry?.status === "Rejected" && (
        <div className="self-center w-full text-[--delete] font-bold font-montserrat tracking-wide p-1 rounded-3xl text-center">
          Reservation rejected
        </div>
      )}
      {entry?.status === "Reserved" && (
        <div className="self-center w-full text-[--money] font-bold font-montserrat tracking-wide p-1 rounded-3xl text-center">
          Reservation Approved
        </div>
      )}
      {entry?.status === "Parking" && (
        <div className="self-center w-full text-primary font-bold font-montserrat tracking-wide p-1 rounded-3xl text-center">
          You are currently parked
        </div>
      )}
      {entry?.status === "Exited" && (
        <div className="self-center w-full text-secondaryforeground font-bold font-montserrat tracking-wide p-1 rounded-3xl text-center">
          You are no longer parked
        </div>
      )}
      {!entry && (
        <div className="self-center w-full text-[--delete] font-bold font-montserrat tracking-wide p-1 rounded-3xl text-center">
          Your entry got deleted
        </div>
      )}
      <ReservationDisplay entry={entry} />
      {entry?.status === "Pending" && <CancelButton id={entry.id} />}
      {entry?.status === "Rejected" && <ReservationExitButton id={entry.id} />}
      {entry?.status === "Reserved" && <CancelButton id={entry.id} />}
      {entry?.status === "Exited" && <Exit />}
      {!entry && <Exit />}
    </div>
  );
}
