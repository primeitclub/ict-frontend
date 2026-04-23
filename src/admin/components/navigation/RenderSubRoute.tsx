import { NavLink, Outlet } from "react-router-dom";

interface SubRoute {
  label: string;
  path: string;
}

interface RenderSubRouteProps {
  routes: SubRoute[];
}

export default function RenderSubRoute({ routes }: RenderSubRouteProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex space-x-2 border-b border-gray-800 pb-2 mb-4 overflow-x-auto overflow-y-hidden">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            relative="path"
            to={`../${route.path}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all whitespace-nowrap text-sm font-medium ${
                isActive
                  ? "bg-admin-secondary text-white"
                  : "text-gray-400 hover:text-white hover:bg-admin-secondary/50"
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
