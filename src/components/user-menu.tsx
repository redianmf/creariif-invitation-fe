import { DropdownMenu } from "radix-ui";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { selectAuthUser, useAuthStore } from "../shared/auth/auth-store";
import { useI18n } from "../shared/i18n/i18n-context";
import { Button } from "./ui/button";

export function UserMenu() {
  const navigate = useNavigate();
  const user = useAuthStore(selectAuthUser);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useI18n();
  const initial = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full bg-pink-100 font-semibold text-pink-700 hover:bg-pink-200 hover:text-pink-800"
          aria-label={t("profile.menu")}
        >
          {initial}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-52 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
        >
          <div className="border-b border-slate-100 px-3 py-2">
            <p className="truncate text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <DropdownMenu.Item
            onSelect={() => navigate("/profile")}
            className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-100 focus:bg-slate-100"
          >
            <User size={16} />
            {t("profile.menu")}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 outline-none hover:bg-rose-50 focus:bg-rose-50"
          >
            <LogOut size={16} />
            {t("auth.logout")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
