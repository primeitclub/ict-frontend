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
import { useVersionData } from "../../hooks/use-version-data";
import { ictClient, ApiError } from "../../../lib";

interface FormState {
  fullName: string;
  contactNumber: string;
  email: string;
  isStudent: "Yes" | "No" | "";
  educationLevel: string;
  faculty: string;
  year: string;
  eventId: string;
}

const EDUCATION_LEVELS = ["School", "High School", "Bachelors", "Masters"];

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
    faculty: "",
    year: "",
    eventId: queryEventId || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

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
    const selectedEvent = events.find((e) => e.id === form.eventId);
    if (selectedEvent && (selectedEvent.availableSeats ?? selectedEvent.totalSeats - (selectedEvent.registeredCount ?? 0)) <= 0) {
      setErrorMsg("Sorry, this event is fully booked.");
      return;
    }
    const isPaid = selectedEvent?.feeType === "paid";
    if (isPaid && !paymentFileRef.current) {
      setErrorMsg("Please upload your payment screenshot.");
      return;
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
      data.append("faculty", form.faculty);
      data.append("year", form.year);
    }
    data.append("eventId", form.eventId);
    data.append("versionId", versionId);
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

  const publishedEvents = events.filter(
    (e) => e.status === "published" && (e.availableSeats ?? e.totalSeats - (e.registeredCount ?? 0)) > 0,
  );

  return (
    <div className="py-0">
      <TopBgContent className="z-0">
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
          className="relative z-10 bg-[#FFFFFF] lg:w-[800px] mx-auto -mt-20 text-black p-6 md:p-12 space-y-6 rounded-lg shadow-[0_4px_8px_0_#00000014]"
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