import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Hero", path: "hero" },
  { label: "About", path: "about" },
  { label: "Events", path: "events" },
  { label: "Gallery", path: "gallery" },
  { label: "FAQs", path: "faqs" },
];

export default function ContentManagementLayout() {
  return <RenderSubRoute routes={routes} />;
}
