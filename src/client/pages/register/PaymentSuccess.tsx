import { useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "../../../lib";
import { Button } from "../../../shared/design-components";
import { ChevronRight } from "lucide-react";
import TopBgContent from "../../components/bg-content";
import { Heading } from "../../../shared/design-components";
import Success from "../register/icons/Success.svg";

interface EventRegistrationDetail {
  id: string;
  versionId: string;
  event: {
    title: string;
    date: string | null;
    location: string;
    fee: string;
    feeType: string;
  };
}

interface ContactSettings {
  clubEmail: string | null;
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("id");

  const { data: registrationRes, isLoading: isRegistrationLoading } = useApiQuery(
    "eventRegistrationDetail",
  )<Envelope<EventRegistrationDetail>>({
    pathParams: { registrationId: registrationId ?? "" },
    enabled: !!registrationId,
  });

  const versionId = registrationRes?.data?.versionId;

  const { data: contactsRes, isLoading: isContactsLoading } = useApiQuery(
    "settingsContacts",
  )<Envelope<ContactSettings>>({
    queryParams: { versionId: versionId ?? undefined },
    enabled: !!versionId,
  });

  const isLoading = isRegistrationLoading || (!!versionId && isContactsLoading);

  const regDetail = registrationRes?.data;
  const contactEmail = contactsRes?.data?.clubEmail || "sauravmdhr@gmail.com";

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    try {
      const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const getPrice = () => {
    if (!regDetail?.event) return "Free";
    return regDetail.event.feeType === "free" ? "Free" : regDetail.event.fee;
  };

  if (isLoading) {
    return (
      <div className="py-0">
        <TopBgContent className="z-0"></TopBgContent>
        <div className="bg-[#F2F5FA] font-sans p-10 min-h-[500px] flex items-center justify-center">
          <p className="text-center text-[#64748B] text-lg">Loading registration details...</p>
        </div>
      </div>
    );
  }

  // Fallback to static dummy data if no registration ID was provided (e.g. direct nav)
  const displayId = regDetail?.id ? `ICT_${regDetail.id.split("-")[0].toUpperCase()}` : "ICT_294138535";
  const displayName = regDetail?.event?.title ?? "Mastering Component Driven Architecture";
  const displayDate = formatDate(regDetail?.event?.date) !== "N/A" ? formatDate(regDetail?.event?.date) : "10th February, 2026";
  const displayVenue = regDetail?.event?.location ?? "Prime College";
  const displayPrice = regDetail?.event ? getPrice() : "Free";

  return (
    <div className="py-0">
      <TopBgContent className="z-0"></TopBgContent>
      <div className="bg-[#F2F5FA] font-sans p-10">
        <div className="relative z-10 bg-[#FFFFFF] lg:w-[800px] mx-auto -mt-60 flex flex-col gap-2 sm:gap-7 px-2 py-6 md:px-8 md:py-7 space-y-6 rounded-lg shadow-[0px_8.66px_34.64px_-8.66px_#00000029] ">
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

          {/* Event Details Card Section */}
          <div className="flex flex-col gap-[8px] md:min-w-[434px] mx-auto text-[10px] lg:text-[12px]">
            <div className="bg-[#F8FAFC] p-[12px] rounded-[6px]">
              <InfoRow label="Registration ID" value={displayId} />
            </div>

            <div className="bg-[#F8FAFC] px-[16px] py-[10px] mx-[2px] rounded-[6px]">
              <span className="text-[#020919] font-medium">Event Details</span>

              <InfoRow label="Event Name" value={displayName} />
              <InfoRow label="Event Date" value={displayDate} />

              <InfoRow label="Location" value={displayVenue} />
              <InfoRow
                label="Event Price"
                value={displayPrice}
                valueClassName="text-[#16A34A]"
              />
            </div>

            <div className="bg-[#F8FAFC] p-[12px] rounded-[6px]">
              <InfoRow
                label="Contact Email:"
                value={contactEmail}
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
              onClick={() => navigate("/events")}
            />{" "}
            <Button
              variant="solid-white"
              rightIcon={<ChevronRight />}
              label="Contact Support"
              className="flex mx-auto text-[#3571F0] shadow-[0px_0px_6px_0px_#00000033] text-nowrap   w-full"
              type="button"
              onClick={() => navigate("/contacts")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
