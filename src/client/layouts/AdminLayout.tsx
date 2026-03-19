import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AdminLayout() {
  const links = [
    { label: "Admin", path: "setting" },
    { label: "Add page", path: "events" },
  ];

  return (
    <>
      <div>this is header</div>
      <div className="flex bg-red-300 h-full">
        <aside>
          <div className="flex flex-col">
            {links.length &&
              links.map((item) => {
                return (
                  <NavLink to={`${item.path}`} replace>
                    {item.label}
                  </NavLink>
                );
              })}
          </div>
        </aside>
        <Outlet />
      </div>
    </>
  );
}
