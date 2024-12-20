import {
  getAllReservations,
  getPrivateEntries,
  getPrivateHistory,
  getPublicEntries,
  getPublicHistory,
} from "@/actions/getEntries";
import { validateRequest } from "@/actions/validateRequest";
import CreateButton from "@/components/CreateButton";
import { PrivateCard, PublicCard } from "@/components/DashboardCards";
import { EntryLogs } from "@/components/EntryLogs";
import { LogoutButton } from "@/components/LogoutButton";
import { NotificationIcon } from "@/components/ReservationNotification";
import { SearchComponent } from "@/components/SearchComponent";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await validateRequest();
  if (!user) return redirect("/admin");

  const pub = await getPublicEntries();
  const pri = await getPrivateEntries();
  const pubHis = (await getPublicHistory()) || [];
  const priHis = (await getPrivateHistory()) || [];
  const reservations = (await getAllReservations()) || [];

  return (
    <div className="h-full w-full grid grid-rows-12 gap-1">
      <div className="row-span-1 bg-secondary w-full px-8 flex items-center">
        <div className="font-bold text-3xl">Parking Dashboard</div>
        <div className="flex items-center gap-5 ml-auto">
          <NotificationIcon reservations={reservations} />
          <EntryLogs publicEntries={pubHis} privateEntries={priHis} />
          <LogoutButton />
        </div>
      </div>

      <div className="row-span-11 p-4 px-6 grid grid-rows-[24] gap-4">
        <div className="row-start-[1] row-end-[9] grid grid-cols-2 gap-6">
          <PublicCard count={pub.length} />
          <PrivateCard count={pri.length} />
        </div>

        <div className="row-start-[9] row-end-[11] rounded-3xl px-4 bg-secondary py-2 grid grid-cols-7 text-center">
          <div className="col-start-1 col-end-2 self-center">Type</div>
          <div className="col-start-2 col-end-3 self-center">Owner</div>
          <div className="col-start-3 col-end-4 self-center">Plate No.</div>
          <div className="col-start-4 col-end-5 self-center">Status</div>
          <div className="col-start-5 col-end-6 self-center">Duration</div>
          <div className="col-start-6 col-end-8 flex items-center gap-4">
            <SearchComponent />
            <CreateButton
              pub={pub}
              pri={pri}
              pubCount={pub.length}
              priCount={pri.length}
            />
          </div>
        </div>

        <div className="row-start-[11] row-end-[25] flex flex-col z-0 gap-2 overflow-auto bg-secondary rounded-3xl px-4 py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
