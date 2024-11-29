"use server";

import { db } from "@/db-init";

export const ExitPublicEntry = async (id: number) => {
  await db.query(
    `DELETE FROM public_entry
                WHERE id = $1`,
    [id],
  );
};

export const ExitPrivateEntry = async (id: number) => {
  await db.query(
    `DELETE FROM private_entry
                WHERE id = $1`,
    [id],
  );
};
