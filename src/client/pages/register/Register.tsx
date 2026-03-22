import SectionContainer from "../../../shared/layouts/sectionContainer";
import { Heading } from "../../../shared/design-components";
import InputBox from "./components/InputBox";
import Payment from "./components/Payment";
import Personal from "./icons/personal";
import Academic from "./icons/Academic";
import Events from "./icons/Events";
import { Button } from "../../../shared/design-components";
import { ChevronRight } from "lucide-react";

const Register = () => {
  return (
    <SectionContainer width="full" className="py-0">
      <header className="text-center flex flex-col justify-center items-center bg-gradient-to-b from-[#020919] to-[#3571F0] min-h-[326px]  ">
        <Heading
          align="center"
          className="text-[#F5F7FA] text-[36px] md:text-[48px]"
        >
          Register for the Event
        </Heading>
        <p className="font-medium text-[#94A3B8] text-[16px] p-[14px] lg:w-[50%]">
          Provide your details below to complete your event registration. Please
          ensure all information is accurate before submitting the form.
        </p>
      </header>
      <div className="bg-[#F2F5FA] font-sans p-10">
        <form
          action=""
          className="bg-[#FFFFFF] w-fit mx-auto text-black p-6 md:p-12  space-y-6 rounded-lg shadow-[0_4px_8px_0_#00000014] z-2 "
        >
          {/* Personal Information */}

          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Personal />
              <legend className="font-semibold">Personal Information</legend>
            </span>

            <div className="space-y-6  md:space-y-0 md:flex gap-x-6 ">
              <InputBox
                inputName="Full Name"
                placeHolder="Enter your full name"
                variant="box"
              />
              <InputBox
                inputName="Contact Number"
                placeHolder="+977- "
                variant="box"
              />
            </div>
            <InputBox
              inputName="Email Address"
              placeHolder="example@domain.com"
              variant="box"
            />
          </div>

          {/* Academic detail */}
          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Academic />
              <legend className="font-semibold">Academic Details</legend>
            </span>

            <div className="space-y-6 md:space-y-0 md:flex justify-between gap-6 ">
              <InputBox
                inputName="Are you a student?"
                variant="radio"
                options={["Yes", "No"]}
              />
              <InputBox
                inputName="Education Level"
                placeHolder="example@domain.com"
                variant="box"
              />
            </div>
            <div className="space-y-6  md:space-y-0 md:flex gap-6 ">
              <InputBox
                inputName="Your Faculty"
                placeHolder="e.g. CSIT, BCA"
                variant="box"
              />
              <InputBox
                inputName="Year/Batch"
                placeHolder="e.g. 2078 "
                variant="box"
              />
            </div>
          </div>
          {/* Event Selection and Payment */}
          <div className="space-y-6">
            <span className="flex gap-2">
              <Events />
              <legend className="font-semibold">
                Events Selction & Payment
              </legend>
            </span>

            <InputBox inputName="Event" variant="box" />
            <Payment />
          </div>
          <Button
            variant="filled"
            rightIcon={<ChevronRight />}
            label="Register Now"
            className="flex mx-auto"
          />
        </form>
      </div>
    </SectionContainer>
  );
};

export default Register;
