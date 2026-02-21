import MetricCard from "./components/MetricCard";

const metrics = [
  { value: "2K +", label: "Students Participated" },
  { value: "250K +", label: "Social Media Reach" },
  { value: "20 +", label: "Total Collaborations" },
] as const;

const MetricSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full text-center">
      <div className="absolute h-[420px] w-14 left-0 md:hidden overflow-hidden ">
        <div
          className="h-full w-full -translate-x-1/2 rounded-full
      bg-[linear-gradient(to_right,#E7F8FF_60%,#E7F8FF_26%,#0956f9_25%,#171717_200%)] 
      blur-sm"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        ></div>
      </div>
      <div className="absolute h-[420px] w-14 right-0 md:hidden overflow-hidden ">
        <div
          className="h-full w-full translate-x-1/2 rounded-full
      bg-[linear-gradient(to_left,#E7F8FF_60%,#E7F8FF_26%,#0956f9_25%,#171717_200%)] 
      blur-sm"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        ></div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center text-center md:flex-row md:items-stretch ">
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
                      w-0.5 h-20 mx-12 lg:mx-10 self-center
                      bg-gradient-to-b from-transparent via-[#02369B] to-transparent
                    "
                  />
                  <div
                    className="
                      block md:hidden
                      h-0.5 w-3/4 max-w-xs my-9
                      mx-auto
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
