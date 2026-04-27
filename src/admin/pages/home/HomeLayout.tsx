import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Dashboard", path: "dashboard" },
  { label: "Versions", path: "versions" },
];

// We use an empty string because Home is at the root of /admin
const baseRoute = "home";

export default function HomeLayout() {
  return <RenderSubRoute baseRoute={baseRoute} routes={routes} />;
}
