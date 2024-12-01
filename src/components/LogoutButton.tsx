import { logout } from "@/actions/logout";

export const LogoutButton = async () => {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="transition-all duration-200 ease-out active:scale-90 text-base font-bold hover:text-[--delete]"
      >
        sign out
      </button>
    </form>
  );
};
