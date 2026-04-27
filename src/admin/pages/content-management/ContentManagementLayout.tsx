import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Hero", path: "hero" },
  { label: "About", path: "about" },
  { label: "Events", path: "events" },
  { label: "Gallery", path: "gallery" },
  { label: "FAQs", path: "faqs" },
];

const baseRoute = "content-management";

export default function ContentManagementLayout() {
  return <RenderSubRoute baseRoute={baseRoute} routes={routes} />;
}
