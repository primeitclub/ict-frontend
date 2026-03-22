import SectionContainer from "../../../shared/layouts/sectionContainer";
import FilterButton from "./components/TeamButton";
import ArrowSVG from "./icons/arrowSVG";
import TeamCard from "./components/teamCard";
import Dropdown from "./components/Dropdown";
import { Heading } from "../../../shared/design-components";
import { useState } from "react";

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
// Dummy Team Data
const teamData = [
  {
    name: "Saugat KC",
    role: "Social Media",
    socialLinks: { instagram: "#" },
  },
  { name: "Saugat KC", role: "HR", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Finance", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Officers", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Outreach", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Organizer", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Executive", socialLinks: { instagram: "#" } },
  {
    name: "Saugat KC",
    role: "Public Relations",
    socialLinks: { instagram: "#" },
  },
  {
    name: "Saugat KC",
    role: "General Member",
    socialLinks: { instagram: "#" },
  },
  { name: "Saugat KC", role: "Finance", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Officers", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Organizer", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Organizer", socialLinks: { instagram: "#" } },
  { name: "Saugat KC", role: "Executive", socialLinks: { instagram: "#" } },
  {
    name: "Saugat KC",
    role: "Public Relations",
    socialLinks: { instagram: "#" },
  },
  {
    name: "Saugat KC",
    role: "General Member",
    socialLinks: { instagram: "#" },
  },
];

export default function Teams() {
  const [activeRole, setActiveRole] = useState<Role>("All");
  const filteredTeamData =
    activeRole === "All"
      ? teamData
      : teamData.filter((member) => member.role === activeRole);

  return (
    <SectionContainer as="section" className=" py-10">
      <div className="gap-10 md:flex items-start">
        <div className="md:w-[40%] md:sticky md:top-10 h-fit">
          {/* Heading */}
          <Heading className="text-center font-bold bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent md:text-left">
            Meet the <br /> Team
          </Heading>

          {/* filter options Desktop */}
          <div className="hidden md:flex md:flex-wrap gap-[12px] mb-10">
            {roles.map((role, index) => (
              <FilterButton
                key={index}
                variant={activeRole === role ? "active" : "inactive"}
                leftIcon={
                  <ArrowSVG
                    useSolidStroke={activeRole === role} // toggle stroke
                    solidStrokeColor="#DBF5FF" // set solid color
                    className={activeRole === role ? "rotate-[38deg]" : ""}
                  />
                }
                onClick={() => setActiveRole(role)}
                label={role}
                className=" gap-[8.42px] h-fit"
              />
            ))}
          </div>

          {/* Filter Option Mobile */}
          <div className="md:hidden font-sans font-medium max-w-[248px] mx-auto mt-10 mb-20 text-[12px] text-black">
            <Dropdown
              options={roles}
              value={activeRole}
              onChange={(role) => setActiveRole(role as Role)}
            />
          </div>
        </div>

        {/* Team members */}
        <div className="font-base gap-x-[42px] w-fit mx-auto grid justify-between grid-cols-2 lg:grid-cols-3 md:w-[60%] lg:w-[70%] lg:gap-x-[36px]">
          {filteredTeamData.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
