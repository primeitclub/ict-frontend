interface MetricCardProps {
  value: string;
  label: string;
}

const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center">
      
      <h1
        className="
          relative z-10
          font-sans font-bold
          bg-gradient-to-b
          from-[#DBF5FF]
          via-[#007AFF]
          to-[rgba(2,54,155,1)]
          bg-clip-text text-transparent
          md:text-6xl text-5xl
        "
      >
        {value}
      </h1>

      <p className="mt-2 font-sans font-medium">{label}</p>
    </div>
  );
};

export default MetricCard;