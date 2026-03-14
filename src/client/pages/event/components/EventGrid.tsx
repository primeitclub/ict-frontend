import Card from "../../../components/card";
import { tabs } from "../data";

interface EventGridProps {
  activeTab: number;
}

const EventGrid = ({ activeTab }: EventGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tabs[activeTab].content.map((item, index) => (
        <div key={index}>
          <Card item={item} />
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
