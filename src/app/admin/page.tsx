import { LoginForm } from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("parkingsystemcookie");
  if (hasCookie) redirect("/dashboard");
  return <LoginForm />;
}
