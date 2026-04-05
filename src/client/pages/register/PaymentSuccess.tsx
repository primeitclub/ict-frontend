import { Button } from "../../../shared/design-components";
import { ChevronRight } from "lucide-react";
import TopBgContent from "../../components/bg-content";
import { Heading } from "../../../shared/design-components";
import Success from "../register/icons/Success.svg";

const dummyEventDetail = {
  id: "ICT_294138535",
  name: "Mastering Component Driven Architecture",
  date: "10th February, 2026",
  venue: "Prime College",
  price: "Free",
  contactEmail: "sauravmdhr@gmail.com",
};

const InfoRow = ({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="grid grid-cols-2 gap-2 py-1">
    <span className="text-[#64748B]">{label}</span>
    <span
      className={`font-medium break-words text-right ${valueClassName || "text-[#020919]"}`}
    >
      {value}
    </span>
  </div>
);

const PaymentSuccess = () => {
  return (
    <div className="py-0">
      <TopBgContent className="z-0"></TopBgContent>
      <div className="bg-[#F2F5FA] font-sans p-10">
        <div className="relative z-10 bg-[#FFFFFF] lg:w-[800px] mx-auto -mt-60 flex flex-col gap-7 px-2 py-6 md:px-8 md:py-7 space-y-6 rounded-lg shadow-[0px_8.66px_34.64px_-8.66px_#00000029] ">
          <div className="space-y-5">
            <div className="flex justify-center">
              <img src={Success} alt="" />
            </div>

            <div className="space-y-1">
              <Heading
                align="center"
                className="text-[#16A34A] text-[14px] md:text-[14px] lg:text-[20px] mb-0 font-semibold"
              >
                Registration Successful!
              </Heading>

              <p className="font-normal text-center text-[#64748B] text-[12px] lg:text-[16px] px-[13px]">
                Your registration has been completed successfully. You will
                receive a confirmation with further details shortly.
              </p>
            </div>
          </div>

          {/* EVent Details Card Section */}

          <div className="flex flex-col gap-[8px] md:min-w-[434px] mx-auto text-[10px] lg:text-[12px]">
            <div className="bg-[#F8FAFC] p-[12px]">
              <InfoRow label="Registration id:" value={dummyEventDetail.id} />
            </div>

            <div className="bg-[#F8FAFC] px-[16px] py-[10px] mx-[2px]">
              <span className="text-[#020919] font-medium">Event Details</span>

              <InfoRow label="Event Name" value={dummyEventDetail.name} />
              <InfoRow label="Event Date" value={dummyEventDetail.date} />

              <InfoRow label="Location" value={dummyEventDetail.venue} />
              <InfoRow
                label="Event Price"
                value={dummyEventDetail.price}
                valueClassName="text-[#16A34A]"
              />
            </div>

            <div className="bg-[#F8FAFC] p-[12px]">
              <InfoRow
                label="Contact Email:"
                value={dummyEventDetail.contactEmail}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between w-full md:w-[434px] mx-auto text-[16px] gap-[12px]">
            <Button
              variant="filled"
              rightIcon={<ChevronRight />}
              label="Explore More Events"
              className="flex mx-auto shadow-[0px_0px_6px_0px_#00000033] text-nowrap w-full "
              type="button"
            />{" "}
            <Button
              variant="solid-white"
              rightIcon={<ChevronRight />}
              label="Contact Support"
              className="flex mx-auto text-[#3571F0] shadow-[0px_0px_6px_0px_#00000033] text-nowrap   w-full"
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
