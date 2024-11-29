import { logout } from "@/actions/logout";

export const LogoutButton = async () => {
  return (
    <form action={logout}>
      <button type="submit" className="text-base font-bold">
        sign out
      </button>
    </form>
  );
};
