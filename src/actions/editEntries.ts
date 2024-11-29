"use server";

import { db } from "@/db-init";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editPublicEntryAction = async (data: FormData) => {
  await db.query(
    `UPDATE public_entry
                SET type = $1, owner = $2, plate = $3
                WHERE id = $4`,
    [data.get("type"), data.get("owner"), data.get("plate"), data.get("id")],
  );
  revalidatePath("/dashboard");
  redirect("/dashboard");
};

export const editPrivateEntryAction = async (data: FormData) => {
  await db.query(
    `UPDATE private_entry
                SET type = $1, owner = $2, plate = $3
                WHERE id = $4`,
    [data.get("type"), data.get("owner"), data.get("plate"), data.get("id")],
  );
  revalidatePath("/dashboard/private");
  redirect("/dashboard/private");
};