"use server";

import { db } from "@/db-init";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPublicEntry = async (data: FormData) => {
  if (data.get("status") === "Reserved") {
    await db.query(
      `INSERT INTO public_entry (type, owner, plate, status, time_parked)
                VALUES ($1, $2, $3, $4, $5)`,
      [
        data.get("type"),
        data.get("owner"),
        data.get("plate"),
        data.get("status"),
        null,
      ],
    );
    revalidatePath("/dashboard");
    return redirect("/dashboard");
  }

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
  if (data.get("status") === "Reserved") {
    await db.query(
      `INSERT INTO private_entry (type, owner, plate, status, time_parked)
                VALUES ($1, $2, $3, $4, $5)`,
      [
        data.get("type"),
        data.get("owner"),
        data.get("plate"),
        data.get("status"),
        null,
      ],
    );
    revalidatePath("/dashboard/private");
    return redirect("/dashboard/private");
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
