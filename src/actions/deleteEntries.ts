"use server";

import { db } from "@/db-init";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deletePublicEntry = async (id: number) => {
  await db.query(
    `DELETE FROM public_entry
                WHERE id = $1`,
    [id],
  );
};

export const deletePrivateEntry = async (id: number) => {
  await db.query(
    `DELETE FROM private_entry
                WHERE id = $1`,
    [id],
  );
};

export const deleteReservationEntry = async (id: number) => {
  await db.query(
    `DELETE FROM private_entry
                WHERE id = $1`,
    [id],
  );
  const cookieStore = await cookies();
  cookieStore.delete("reservationcookie");
  return redirect("/");
};

export const exitReservation = async (id: number) => {
  await db.query(
    `DELETE FROM private_entry
                WHERE id = $1`,
    [id],
  );

  const cookieStore = await cookies();
  cookieStore.delete("reservationcookie");
  return redirect("/");
};

export const removeCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("reservationcookie");
  return redirect("/");
};
