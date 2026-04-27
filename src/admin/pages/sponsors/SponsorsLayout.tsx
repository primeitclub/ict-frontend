import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Categories", path: "categories" },
  { label: "All Sponsors", path: "all-sponsors" },
  { label: "Archive", path: "archive" },
];

const baseRoute = "sponsors";

export default function SponsorsLayout() {
  return <RenderSubRoute baseRoute={baseRoute} routes={routes} />;
}
