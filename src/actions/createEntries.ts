"use server";

import { db } from "@/db-init";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createPublicEntry = async (data: FormData) => {
  await db.query(
    `INSERT INTO public_entry (type, owner, plate, status)
                VALUES ($1, $2, $3, $4)`,
    [
      data.get("type"),
      data.get("owner"),
      data.get("plate"),
      data.get("status"),
    ],
  );
  revalidatePath("/dashboard");
  return redirect("/dashboard");
};

export const createPrivateEntry = async (data: FormData) => {
  if (data.get("status") === "Pending") {
    const result = await db.query(
      `INSERT INTO private_entry (type, owner, plate, status, time_parked)
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING id`,
      [
        data.get("type"),
        data.get("owner"),
        data.get("plate"),
        data.get("status"),
        null,
      ],
    );

    const cookieStore = await cookies();
    cookieStore.set("reservationcookie", result.rows.at(0).id);
    return redirect("/my-reservation");
  }

  await db.query(
    `INSERT INTO private_entry (type, owner, plate, status)
                VALUES ($1, $2, $3, $4)`,
    [
      data.get("type"),
      data.get("owner"),
      data.get("plate"),
      data.get("status"),
    ],
  );
  revalidatePath("/dashboard/private");
  return redirect("/dashboard/private");
};
