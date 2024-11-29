"use server";

import { db } from "@/db-init";

export const getPublicEntries = async () => {
  const result = await db.query(`SELECT * FROM public_entry
                                 WHERE status != 'Pending'
                                 ORDER BY time_parked DESC`);
  return result.rows;
};

export const getPrivateEntries = async () => {
  const result = await db.query(
    `SELECT * FROM private_entry
                        WHERE status NOT IN ('Pending', 'Rejected', 'Exited')
                        ORDER BY time_parked DESC`,
  );
  return result.rows;
};

export const getReservationEntry = async (id: number) => {
  const result = await db.query(
    `SELECT * FROM private_entry
                WHERE id = $1`,
    [id],
  );

  return result.rows.at(0);
};

export const getAllReservations = async () => {
  const result = await db.query(
    `SELECT * FROM private_entry
                        WHERE status = 'Pending'`,
  );
  return result.rows;
};
