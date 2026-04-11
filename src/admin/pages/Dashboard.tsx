import Table from "../components/table/Table";

export default function Dashboard(prop?: any) {
  return (
    <div>
      Dashboard {prop.value}
      <div>
        <Table />
      </div>
    </div>
  );
}
