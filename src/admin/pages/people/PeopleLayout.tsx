import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Speakers", path: "speakers" },
  { label: "Teams", path: "teams" },
];

export default function PeopleLayout() {
  return <RenderSubRoute routes={routes} />;
}
