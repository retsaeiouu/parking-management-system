import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ReservationForm } from "@/components/ReservationForm";

export default async function Home() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("reservationcookie");
  if (hasCookie) redirect("/my-reservation");
  return <ReservationForm />;
}
