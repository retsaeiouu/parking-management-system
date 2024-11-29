"use server";

import { db } from "@/db-init";

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
