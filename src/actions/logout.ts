"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("parkingsystemcookie");
  revalidatePath("/dashboard");
  return redirect("/");
};
