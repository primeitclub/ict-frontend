import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Handshake,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../admin/hooks/use-auth";
import Toast from "../../shared/design-components/toast/Toast";

export default function AdminLayout() {
  const { logout, isLoggingOut } = useAuth();
  const links = [
    { label: "Home", path: "/admin/home", icon: LayoutDashboard },
    {
      label: "Content Management",
      path: "/admin/content-management",
      icon: FileText,
    },
    { label: "People", path: "/admin/people", icon: Users },
    { label: "Sponsors", path: "/admin/sponsors", icon: Handshake },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-admin-primary text-white">
      <div className="flex flex-1">
        <aside className="w-64 bg-admin-primary border-r border-gray-800 p-4 flex flex-col">
          <header className="p-4 bg-admin-primary border-b border-gray-800 mb-4">
            <h1 className="font-bold text-xl">ICT Meetup</h1>
          </header>
          <nav className="flex flex-col space-y-2 flex-1">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded transition-colors ${
                      isActive
                        ? "bg-admin-secondary text-white font-medium"
                        : "text-gray-400 hover:bg-admin-secondary/50 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-800">
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className="flex items-center space-x-3 p-3 rounded text-red-400 hover:bg-red-500/10 transition-colors w-full disabled:opacity-50"
            >
              <LogOut size={20} />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Toast />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
