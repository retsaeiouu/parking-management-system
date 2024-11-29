"use server";

import { db } from "@/db-init";

export const markParkedPublic = async (id: number) => {
  await db.query(
    `UPDATE public_entry
                SET status = 'Parking', time_parked = NOW()
                WHERE id = $1`,
    [id],
  );
};

export const markParkedPrivate = async (id: number) => {
  await db.query(
    `UPDATE private_entry
                SET status = 'Parking', time_parked = NOW()
                WHERE id = $1`,
    [id],
  );
};
