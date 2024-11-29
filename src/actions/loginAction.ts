"use server";

import { db } from "@/db-init";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (_: unknown, formData: FormData) => {
  const username = formData.get("username");
  if (typeof username !== "string" || username.length < 3) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 3) {
    return {
      error: "Invalid password",
    };
  }

  const result = await db.query(`SELECT * FROM admins WHERE username = $1`, [
    username,
  ]);

  if (!result.rows.at(0)) {
    return {
      error: "Incorrect username or password",
    };
  }

  if (password !== result.rows.at(0).password) {
    return {
      error: "Incorrect username or password",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("parkingsystemcookie", result.rows.at(0).id);
  revalidatePath("/admin");
  return redirect("/dashboard");
};
