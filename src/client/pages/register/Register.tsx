import { useState, useRef } from "react";
import { Heading } from "../../../shared/design-components";
import InputBox from "./components/InputBox";
import Payment from "./components/Payment";
import Personal from "./icons/personal";
import Academic from "./icons/Academic";
import Events from "./icons/Events";
import { Button } from "../../../shared/design-components";
import { ChevronRight } from "lucide-react";
import TopBgContent from "../../components/bg-content";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEventsList } from "../event/useEvents";
import { isRegistrationClosed, remainingSeats } from "../../components/event-card-format";
import { useVersionData } from "../../hooks/use-version-data";
import { ictClient, ApiError } from "../../../lib";

interface Participant {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface FormState {
  fullName: string;
  contactNumber: string;
  email: string;
  isStudent: "Yes" | "No" | "";
  educationLevel: string;
  collegeName: string;
  faculty: string;
  year: string;
  eventId: string;
  teamName: string;
  numParticipants: string;
  participants: Participant[];
}

const EDUCATION_LEVELS = ["School", "High School", "Bachelors", "Masters"];

/** Mirrors the API's own fallback when an event sets no maxParticipants. */
const DEFAULT_MAX_PARTICIPANTS = 20;

const labelStyles = "font-medium text-[10px] md:text-sm text-gray-700";
const inputStyles =
  "w-full border border-[#00000014] px-4 py-2.5 rounded-lg text-[10px] md:text-sm bg-white outline-none transition-all focus:border-[#1E67FF] focus:ring-1 focus:ring-[#1E67FF] placeholder:text-gray-400";

const makeParticipants = (n: number): Participant[] =>
  Array.from({ length: n }, () => ({ fullName: "", email: "", phoneNumber: "" }));

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryEventId = searchParams.get("eventId");
  const { versionId } = useVersionData();
  const { events } = useEventsList();
  const paymentFileRef = useRef<File | null>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    contactNumber: "",
    email: "",
    isStudent: "",
    educationLevel: "",
    collegeName: "",
    faculty: "",
    year: "",
    eventId: queryEventId || "",
    teamName: "",
    numParticipants: "",
    participants: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const selectedEvent = events.find((e) => e.id === form.eventId);
  const isGroup = selectedEvent?.eventType === "GROUP";

  const participantCountOptions = Array.from(
    { length: selectedEvent?.maxParticipants ?? DEFAULT_MAX_PARTICIPANTS },
    (_, i) => String(i + 1),
  );

  const handleNumParticipantsChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      numParticipants: value,
      participants: makeParticipants(Number(value) || 0),
    }));
  };

  const updateParticipant = (
    index: number,
    key: keyof Participant,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.map((p, i) =>
        i === index ? { ...p, [key]: value } : p,
      ),
    }));
  };

  const handleFileChange = (file: File | null) => {
    paymentFileRef.current = file;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.fullName || !form.contactNumber || !form.email) {
      setErrorMsg("Please fill in all required personal information fields.");
      return;
    }
    if (!form.eventId) {
      setErrorMsg("Please select an event.");
      return;
    }
    if (selectedEvent && remainingSeats(selectedEvent) <= 0) {
      setErrorMsg("Sorry, this event is fully booked.");
      return;
    }
    const isPaid = selectedEvent?.feeType === "paid";
    if (isPaid && !paymentFileRef.current) {
      setErrorMsg("Please upload your payment screenshot.");
      return;
    }
    if (isGroup) {
      // Mirrors the API's own GROUP checks so the user sees them inline.
      if (form.teamName.trim().length < 3) {
        setErrorMsg("Please enter a team name of at least 3 characters.");
        return;
      }
      if (!form.participants.length) {
        setErrorMsg("Please select the number of participants.");
        return;
      }
      const incomplete = form.participants.some(
        (p) => !p.fullName.trim() || !p.email.trim(),
      );
      if (incomplete) {
        setErrorMsg("Please give every participant a full name and email.");
        return;
      }
    }
    if (!versionId) {
      setErrorMsg("Unable to determine current event version. Try refreshing.");
      return;
    }

    const data = new FormData();
    data.append("username", form.fullName.trim());
    data.append("email", form.email.trim());
    data.append("contactNumber", form.contactNumber.trim());
    data.append("isStudent", String(form.isStudent === "Yes"));
    if (form.isStudent === "Yes") {
      data.append("educationLevel", form.educationLevel);
      data.append("collegeName", form.collegeName.trim());
      data.append("faculty", form.faculty);
      data.append("year", form.year);
    }
    data.append("eventId", form.eventId);
    data.append("versionId", versionId);
    if (isGroup) {
      data.append("teamName", form.teamName.trim());
      // The API JSON.parses this field back out of the multipart body.
      data.append(
        "participants",
        JSON.stringify(
          form.participants.map((p) => ({
            fullName: p.fullName.trim(),
            email: p.email.trim(),
            phoneNumber: p.phoneNumber.trim() || null,
          })),
        ),
      );
    }
    if (paymentFileRef.current) {
      data.append("image", paymentFileRef.current);
    }

    setIsSubmitting(true);
    try {
      const response = await ictClient.post<{ data: { id: string } }>(
        "/event-registrations",
        data,
      );
      const registrationId = response.data.id;
      navigate(`/success?id=${registrationId}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setErrorMsg(
          "Registration requires an account. Please log in and try again.",
        );
      } else {
        setErrorMsg(
          err instanceof ApiError
            ? err.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // The dropdown only lists events that can actually be registered in-app:
  // published, seats left, registration deadline not passed, and no external
  // registerLink (those register off-site).
  const publishedEvents = events.filter(
    (e) =>
      e.status === "published" &&
      remainingSeats(e) > 0 &&
      !isRegistrationClosed(e.registrationDeadline) &&
      !e.registerLink,
  );

  return (
    <div className="py-0">
      {/* Mobile: banner hugs its content with the same pt-10 gap below the
          navbar as the sponsors page (the fixed 250px centered banner left a
          huge gap). Desktop keeps the standard 300px banner. */}
      <TopBgContent
        className="z-0"
        variant="black-glow"
        bannerClassName="h-auto pt-10 pb-24 md:pt-0 md:pb-0 md:h-[300px]"
        contentClassName="py-0"
      >
        <Heading
          align="center"
          className="text-[#F5F7FA] text-[28px] md:text-[40px] font-semibold"
        >
          Register for the Event
        </Heading>
        <p className="font-medium text-center text-[#94A3B8] text-xs md:text-base lg:w-[70%] mx-auto">
          Provide your details below to complete your event registration. Please
          ensure all information is accurate before submitting the form.
        </p>
      </TopBgContent>
      <div className="bg-[#F2F5FA] font-sans p-10">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-[#FFFFFF] lg:w-[800px] mx-auto -mt-24 md:-mt-32 text-black p-6 md:p-12 space-y-6 rounded-lg shadow-[0_4px_8px_0_#00000014]"
        >
          {/* Personal Information */}
          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Personal />
              <legend className="font-semibold text-sm md:text-xl">
                Personal Information
              </legend>
            </span>

            <div className="space-y-6 md:space-y-0 md:flex gap-x-6">
              <InputBox
                inputName="Full Name"
                placeHolder="Enter your full name"
                variant="box"
                value={form.fullName}
                onChange={(v) => set("fullName", v)}
              />
              <InputBox
                inputName="Contact Number"
                placeHolder="+977- "
                variant="box"
                value={form.contactNumber}
                onChange={(v) => set("contactNumber", v)}
              />
            </div>
            <InputBox
              inputName="Email Address"
              placeHolder="example@domain.com"
              variant="box"
              value={form.email}
              onChange={(v) => set("email", v)}
            />
          </div>

          {/* Academic Details */}
          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Academic />
              <legend className="font-semibold text-sm md:text-xl">
                Academic Details
              </legend>
            </span>

            <div className="space-y-6 md:space-y-0 md:flex justify-between gap-6">
              <InputBox
                inputName="Are you a student?"
                variant="radio"
                options={["Yes", "No"]}
                value={form.isStudent}
                onChange={(v) => {
                  set("isStudent", v as "Yes" | "No");
                  if (v === "No") {
                    setForm((prev) => ({
                      ...prev,
                      educationLevel: "",
                      collegeName: "",
                      faculty: "",
                      year: "",
                    }));
                  }
                }}
              />
              {form.isStudent === "Yes" && (
                <InputBox
                  inputName="Education Level"
                  placeHolder="Choose your level"
                  variant="select"
                  options={EDUCATION_LEVELS}
                  value={form.educationLevel}
                  onChange={(v) => set("educationLevel", v)}
                />
              )}
            </div>
            {form.isStudent === "Yes" && (
              <div className="space-y-6 md:space-y-0 md:flex gap-6">
                <InputBox
                  inputName="College Name"
                  placeHolder="e.g. Prime College"
                  variant="box"
                  value={form.collegeName}
                  onChange={(v) => set("collegeName", v)}
                />
                <InputBox
                  inputName="Your Faculty"
                  placeHolder="e.g. CSIT, BCA"
                  variant="box"
                  value={form.faculty}
                  onChange={(v) => set("faculty", v)}
                />
                <InputBox
                  inputName="Year/Batch"
                  placeHolder="e.g. 2078"
                  variant="box"
                  value={form.year}
                  onChange={(v) => set("year", v)}
                />
              </div>
            )}
          </div>

          {/* Event Selection & Payment */}
          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Events />
              <legend className="font-semibold text-sm md:text-xl">
                Event Selection &amp; Payment
              </legend>
            </span>

            <InputBox
              inputName="Select Event"
              placeHolder="Choose an event"
              variant="select"
              options={publishedEvents.map((e) => e.title)}
              value={
                publishedEvents.find((e) => e.id === form.eventId)?.title ?? ""
              }
              onChange={(title) => {
                const found = publishedEvents.find((e) => e.title === title);
                if (found) set("eventId", found.id);
              }}
            />
            <Payment
              onFileChange={handleFileChange}
              selectedEvent={publishedEvents.find((e) => e.id === form.eventId)}
            />
          </div>

          {/* Team Details — shown only for GROUP events */}
          {isGroup && (
            <div className="space-y-6">
              <span className="flex items-center gap-2">
                {/* Reuse the Events icon or a simple group icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1E67FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <legend className="font-semibold text-sm md:text-xl">
                  Team Details
                </legend>
              </span>

              {/* Team Name */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="teamName" className={labelStyles}>
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="teamName"
                  type="text"
                  className={inputStyles}
                  placeholder="Enter your team name"
                  value={form.teamName}
                  onChange={(e) => set("teamName", e.target.value)}
                />
              </div>

              {/* Number of Participants */}
              <InputBox
                inputName="Number of Participants"
                placeHolder="Select number of participants"
                variant="select"
                options={participantCountOptions}
                value={form.numParticipants}
                onChange={handleNumParticipantsChange}
              />

              {/* Dynamic Participant Fields */}
              {form.participants.map((participant, index) => (
                <div
                  key={index}
                  className="border border-[#00000014] rounded-lg p-4 space-y-4"
                >
                  <p className="font-semibold text-sm text-[#1E67FF]">
                    Participant {index + 1}
                  </p>
                  <div className="space-y-4 md:space-y-0 md:flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor={`participant-name-${index}`}
                        className={labelStyles}
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`participant-name-${index}`}
                        type="text"
                        className={inputStyles}
                        placeholder="Enter full name"
                        value={participant.fullName}
                        onChange={(e) =>
                          updateParticipant(index, "fullName", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor={`participant-email-${index}`}
                        className={labelStyles}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`participant-email-${index}`}
                        type="email"
                        className={inputStyles}
                        placeholder="example@domain.com"
                        value={participant.email}
                        onChange={(e) =>
                          updateParticipant(index, "email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <label
                      htmlFor={`participant-phone-${index}`}
                      className={labelStyles}
                    >
                      Phone Number{" "}
                      <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      id={`participant-phone-${index}`}
                      type="tel"
                      className={inputStyles}
                      placeholder="+977- "
                      value={participant.phoneNumber}
                      onChange={(e) =>
                        updateParticipant(index, "phoneNumber", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <Button
            variant="filled"
            rightIcon={<ChevronRight />}
            label={isSubmitting ? "Submitting…" : "Register Now"}
            className="flex mx-auto text-sm md:text-base"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;