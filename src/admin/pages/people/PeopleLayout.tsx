import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Speakers", path: "speakers" },
  { label: "Teams", path: "teams" },
];

const baseRoute = "people";

export default function PeopleLayout() {
  return <RenderSubRoute baseRoute={baseRoute} routes={routes} />;
}
