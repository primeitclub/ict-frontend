import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib";

export default function Dashboard(prop?: any) {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiClient.get("/flagship-event").then((res) => res.data),
  });

  console.log("Data", data);

  return (
    <div>
      Dashboard {prop.value}
      <div></div>
    </div>
  );
}
