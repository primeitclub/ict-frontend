interface MetricCardProps {
  value: string;
  label: string;
}

const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center">
      <div
        className="
          absolute
          bottom-[25%]
          left-1/2
          -translate-x-1/2
          w-[120px]
          h-[18px]
          bg-primary
          blur-[10px]
          z-[100]
        "
      />

      <h1
        className="
          relative z-10
          font-sans font-bold
          bg-gradient-to-b
          from-[#DBF5FF]
          via-[#007AFF]
          to-[rgba(2,54,155,0.08)]
          bg-clip-text text-transparent
          md:text-6xl text-4xl
        "
      >
        {value}
      </h1>

      <p className="mt-2 font-sans text-gray-300">{label}</p>
    </div>
  );
};

export default MetricCard;