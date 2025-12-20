// Dynamic page for version
import { useParams } from "react-router-dom";
export default function DynamicPage() {
  const { slug } = useParams();
  return <div>Dynamic page: {slug}</div>;
}
