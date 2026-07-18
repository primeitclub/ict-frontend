import { useSearchParams, useNavigate } from "react-router-dom";
import { useVersion } from "../../routes/VersionContext";
import { Button } from "../../../shared/design-components";
import { ChevronRight } from "lucide-react";
import TopBgContent from "../../components/bg-content";
import { Heading } from "../../../shared/design-components";
import Success from "../register/icons/Success.svg";
import { useApiQuery } from "../../../lib";
import { formatShortDate } from "../../components/event-card-format";
import { useSiteSettings } from "../../hooks/use-site-settings";

interface Envelope<T> {
  message: string;
  data: T;
}

interface EventDetail {
  id: string;
  title: string;
  date: string | null;
  location: string;
  fee: string;
  feeType: string;
  eventType?: "SINGLE" | "GROUP";
}

interface Participant {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
}

interface EventRegistrationDetail {
  id: string;
  trackingId: string;
  eventId: string;
  versionId: string;
  username: string;
  email: string;
  contactNumber: string;
  teamName?: string | null;
  participants?: Participant[] | null;
  event?: EventDetail | null;
}

interface ContactsData {
  email?: string | null;
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
  const { getPath } = useVersion();
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("id");

  const { data: regRes, isLoading: isRegLoading } = useApiQuery(
    "eventRegistrationDetail",
  )<Envelope<EventRegistrationDetail>>({
    pathParams: { registrationId: registrationId ?? "" },
    enabled: !!registrationId,
  });
  const regDetail = regRes?.data ?? null;

  // The detail endpoint already embeds the full event; only fall back to a
  // direct lookup if that relation is ever missing.
  const needsEventFallback = !!regDetail?.eventId && !regDetail?.event?.title;
  const { data: eventRes, isLoading: isEventFallbackLoading } = useApiQuery(
    "eventDetail",
  )<Envelope<EventDetail>>({
    pathParams: { eventId: regDetail?.eventId ?? "" },
    enabled: needsEventFallback,
  });
  const eventDetail = regDetail?.event ?? eventRes?.data ?? null;

  const { data: contactsRes } = useApiQuery(
    "settingsContacts",
  )<Envelope<ContactsData>>({
    queryParams: { versionId: regDetail?.versionId },
    enabled: !!regDetail?.versionId,
  });
  const { data: siteSettings } = useSiteSettings();
  const contactEmail = siteSettings?.clubEmail || contactsRes?.data?.email || "—";

  const isLoading =
    isRegLoading || (needsEventFallback && isEventFallbackLoading);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return formatShortDate(dateStr);
  };

  const getPrice = () => {
    if (!eventDetail) return "Free";
    return eventDetail.feeType === "free" ? "Free" : `NPR ${eventDetail.fee}`;
  };

  if (isLoading) {
    return (
      <div className="py-0">
        <TopBgContent className="z-0" variant="black-glow"></TopBgContent>
        <div className="bg-[#F2F5FA] font-sans p-10 min-h-[500px] flex items-center justify-center">
          <p className="text-center text-[#64748B] text-lg">Loading registration details...</p>
        </div>
      </div>
    );
  }

  const displayId = regDetail?.trackingId ?? "—";
  const displayUsername = regDetail?.username ?? "—";
  const displayEmail = regDetail?.email ?? "—";
  const displayContact = regDetail?.contactNumber ?? "—";
  const participants = regDetail?.participants ?? [];
  const isGroup = participants.length > 0 || !!regDetail?.teamName;
  const displayName = eventDetail?.title ?? "—";
  const displayDate = formatDate(eventDetail?.date);
  const displayVenue = eventDetail?.location ?? "—";
  const displayPrice = eventDetail ? getPrice() : "—";

  return (
    <div className="py-0">
      <TopBgContent className="z-0" variant="black-glow"></TopBgContent>
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
                Registration Submitted
              </Heading>

              <p className="font-normal text-center text-[#64748B] text-[12px] lg:text-[16px] px-[13px]">
                Your registration has been received and is pending approval.
                We'll send you a confirmation email once it's approved. Please
                allow a few hours for the review process.
              </p>
            </div>
          </div>

          {/* Event Details Card Section */}
          <div className="flex flex-col gap-[8px] md:min-w-[434px] mx-auto text-[10px] lg:text-[12px]">
            <div className="bg-[#F8FAFC] p-[12px] rounded-[6px]">
              <InfoRow label="Registration ID" value={displayId} />
            </div>

            <div className="bg-[#F8FAFC] px-[16px] py-[10px] mx-[2px] rounded-[6px]">
              <span className="text-[#020919] font-medium">Registrant Details</span>

              <InfoRow label="Name" value={displayUsername} />
              <InfoRow label="Email" value={displayEmail} />
              <InfoRow label="Contact Number" value={displayContact} />
            </div>

            {isGroup && (
              <div className="bg-[#F8FAFC] px-[16px] py-[10px] mx-[2px] rounded-[6px]">
                <span className="text-[#020919] font-medium">Team Details</span>

                <InfoRow label="Team Name" value={regDetail?.teamName ?? "—"} />
                <InfoRow
                  label="Total Members"
                  value={String(participants.length)}
                />

                {participants.map((participant, index) => (
                  <div
                    key={`${participant.email}-${index}`}
                    className="mt-[8px] border-t border-[#E2E8F0] pt-[8px]"
                  >
                    <span className="text-accent font-medium">
                      Member {index + 1}
                    </span>
                    <InfoRow label="Name" value={participant.fullName || "—"} />
                    <InfoRow label="Email" value={participant.email || "—"} />
                    <InfoRow
                      label="Phone Number"
                      value={participant.phoneNumber || "—"}
                    />
                  </div>
                ))}
              </div>
            )}

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
              onClick={() => navigate(getPath("/events"))}
            />{" "}
            <Button
              variant="solid-white"
              rightIcon={<ChevronRight />}
              label="Contact Support"
              className="flex mx-auto text-accent shadow-[0px_0px_6px_0px_#00000033] text-nowrap   w-full"
              type="button"
              onClick={() => navigate(getPath("/contacts"))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
