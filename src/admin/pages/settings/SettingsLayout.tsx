import RenderSubRoute from "../../components/navigation/RenderSubRoute";

const routes = [
  { label: "Social Media Profile", path: "social-media-profile" },
  { label: "Contact Management", path: "contact-management" },
  { label: "Payment Setup", path: "payment-setup" },
];

export default function SettingsLayout() {
  return <RenderSubRoute routes={routes} />;
}
