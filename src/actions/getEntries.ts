"use server";

import { db } from "@/db-init";

export const getPublicEntries = async () => {
  const result = await db.query(`SELECT * FROM public_entry
                                                    ORDER BY time_parked DESC`);
  return result.rows;
};

export const getPrivateEntries = async () => {
  const result = await db.query(`SELECT * FROM private_entry
                                                    ORDER BY time_parked DESC`);
  return result.rows;
};
