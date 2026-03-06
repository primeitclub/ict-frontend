// import SectionHeader from "../../components/sectionHeader";
import SectionContainer from "../../../shared/layouts/sectionContainer";
import { Button } from "../../../shared/design-components";
import ArrowSVG from "./icons/arrowSVG";
// import "../../../App.css";
import "./teams.css";

import TeamCard from "../../components/teamCard";

type Role =
  | "All"
  | "HR"
  | "Finance"
  | "Officers"
  | "Outreach"
  | "Organizer"
  | "Directors"
  | "Events"
  | "Marketing"
  | "Executive"
  | "Public Relations"
  | "General Member";

const roles: Role[] = [
  "All",
  "HR",
  "Finance",
  "Officers",
  "Outreach",
  "Organizer",
  "Directors",
  "Events",
  "Marketing",
  "Executive",
  "Public Relations",
  "General Member",
];

const teamData = [
  { name: "Saugat KC", role: "Social Media" },
  { name: "Saugat KC", role: "HR" },
  { name: "Saugat KC", role: "Finance" },
  { name: "Saugat KC", role: "Officers" },
  { name: "Saugat KC", role: "Outreach" },
  { name: "Saugat KC", role: "Organizer" },
  { name: "Saugat KC", role: "Executive" },
  { name: "Saugat KC", role: "Public Relations" },
  { name: "Saugat KC", role: "General Member" },
  { name: "Saugat KC", role: "Finance" },
  { name: "Saugat KC", role: "Officers" },
  { name: "Saugat KC", role: "Organizer" },
  { name: "Saugat KC", role: "Organizer" },
  { name: "Saugat KC", role: "Executive" },
  { name: "Saugat KC", role: "Public Relations" },
  { name: "Saugat KC", role: "General Member" },
];

export default function Teams() {
  return (
    <SectionContainer as="section" className="py-10">
      <div className="gap-10 md:flex ">
        <div className="md:w-[40%] md:sticky md:top-[2rem]  md:h-fit lg-w-[30%]">
          {/* Heading */}
          <div className="text-center text-[32px] font-bold mb-20  md:text-left md:text-[48px] 2xl:text-[80px] leading-[37px] px-3 md:leading-[73px] bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent -tracking-[1px] ">
            Meet the Team
          </div>

          {/* filter options */}
          <div className="flex flex-wrap gap-x-[19px] gap-y-[14px] mb-10">
            {roles.map((role, index) => (
              <Button
                key={index}
                variant="glass"
                leftIcon={<ArrowSVG />}
                label={role}
              />
            ))}
          </div>
        </div>

        {/* Team members */}
        <div className="scroll-bar gap-x-[42px] md:h-screen w-fit grid justify-between grid-cols-2 lg:grid-cols-3 h-fit md:w-[60%] lg:w-[70%] lg:gap-x-[36px]">
          {teamData.map((member, index) => (
            <TeamCard key={index} name={member.name} role={member.role} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
