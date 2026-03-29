import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Events", path: "/admin/events" },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-black border-b">
        <h1 className="font-bold">Admin Portal</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-black border-r p-4">
          <nav className="flex flex-col space-y-2">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `p-2 rounded transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-bold"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
