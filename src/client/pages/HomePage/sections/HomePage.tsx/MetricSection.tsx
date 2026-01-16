import MetricCard from '../../components/MetricCard';

const metrics = [
  { value: "100K +", label: "Social Media Reach" },
  { value: "50K +", label: "Students Participated" },
  { value: "200 +", label: "Total Collaborations" },
  
] as const;

const MetricSection = () => {
  return (
    <div className="relative py-12 md:py-16">
      <div
        className="
          md:hidden
          absolute left-4 top-1/3
          w-[6px] h-32
          rounded-full
          bg-[#007AFF]
          blur-[15px]
          rotate-[-179.675deg]
        "
      />
      <div
        className="
          md:hidden
          absolute right-4 top-1/3
          w-[6px] h-32
          rounded-full
          bg-[#007AFF]
          blur-[15px]
          rotate-[-179.675deg]
        "
      />

      <div className="flex justify-center">
        <div
          className="flex flex-col items-center gap-10 text-center md:flex-row md:items-stretch md:gap-12 lg:gap-16"
        >
        {metrics.map((metric, index) => (
  <div
    key={metric.label}
    className="flex flex-col items-center w-full md:flex-row md:items-center md:justify-center md:w-auto"
  >
    <div className="flex flex-col items-center">
      <MetricCard value={metric.value} label={metric.label} />
    </div>

    {index < metrics.length - 1 && (
      <>
        <div
          className="
            hidden md:block
            w-0.5 h-20 mx-6 lg:mx-10 self-center
            bg-gradient-to-b from-transparent via-[#02369B] to-transparent
          "
        />
        <div
          className="
            block md:hidden
            h-0.5 w-3/4 max-w-xs my-6
            bg-gradient-to-r from-transparent via-[#02369B] to-transparent
          "
        />
      </>
    )}
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default MetricSection;