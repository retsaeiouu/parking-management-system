import { db } from "@/db-init";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const validateRequest = async () => {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("parkingsystemcookie");
  if (!hasCookie) return redirect("/");

  const userId = cookieStore.get("parkingsystemcookie");
  if (!userId) return redirect("/");

  const result = await db.query(`SELECT * FROM admins WHERE id = $1`, [
    userId.value,
  ]);
  if (!result.rows.at(0)) return redirect("/");

  return result.rows.at(0).username;
};
