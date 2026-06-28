import SectionContainer from "../../components/sectionContainer";
import FilterButton from "./components/TeamButton";
import ArrowSVG from "./icons/arrowSVG";
import TeamCard from "./components/teamCard";
import Dropdown from "./components/Dropdown";
import { Heading } from "../../../shared/design-components";
import { useState } from "react";
import { useApiQuery } from "../../../lib";
import { useVersionData } from "../../hooks/use-version-data";

interface Category {
  id: string;
  name: string;
  displayName: string;
}

interface TeamMember {
  id: string;
  name: string;
  imageUrl: string | null;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
  };
  category: Category;
  designation: { id: string; name: string } | null;
}

interface PaginatedResult<T> {
  items: T[];
  meta: { total: number; page: number; limit: number };
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

export default function Teams() {
  const { versionId, isLoading: versionLoading } = useVersionData();
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  const { data: categoriesRes, isLoading: categoriesLoading } = useApiQuery(
    "teamMemberCategories",
  )<Envelope<PaginatedResult<Category>>>({
    queryParams: { limit: 100 },
    enabled: !!versionId,
  });

  const { data: membersRes, isLoading: membersLoading } = useApiQuery(
    "teamMembers",
  )<Envelope<PaginatedResult<TeamMember>>>({
    queryParams: {
      versionId: versionId ?? undefined,
      ...(activeCategoryId !== "all" ? { categoryId: activeCategoryId } : {}),
      limit: 200,
    },
    enabled: !!versionId,
  });

  const categories: Category[] = categoriesRes?.data?.items ?? [];
  const members: TeamMember[] = membersRes?.data?.items ?? [];
  const isLoading = versionLoading || categoriesLoading || membersLoading;

  const categoryOptions = [
    { id: "all", displayName: "All" },
    ...categories.map((c) => ({ id: c.id, displayName: c.displayName })),
  ];

  const activeLabel =
    categoryOptions.find((c) => c.id === activeCategoryId)?.displayName ?? "All";

  return (
    <SectionContainer as="section" className=" py-10">
      <div className="gap-10 md:flex items-start">
        <div className="md:w-[40%] md:sticky md:top-10 h-fit">
          {/* Heading */}
          <Heading className="text-center font-bold bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent md:text-left">
            Meet the <br /> Team
          </Heading>

          {/* Filter options — Desktop */}
          <div className="hidden md:flex md:flex-wrap gap-[12px] mb-10">
            {categoryOptions.map((cat) => (
              <FilterButton
                key={cat.id}
                variant={activeCategoryId === cat.id ? "active" : "inactive"}
                leftIcon={
                  <ArrowSVG
                    useSolidStroke={activeCategoryId === cat.id}
                    solidStrokeColor="#DBF5FF"
                    className={activeCategoryId === cat.id ? "rotate-[38deg]" : ""}
                  />
                }
                onClick={() => setActiveCategoryId(cat.id)}
                label={cat.displayName}
                className="gap-[8.42px] h-fit"
              />
            ))}
          </div>

          {/* Filter Option — Mobile */}
          <div className="md:hidden font-sans font-medium max-w-[248px] mx-auto mt-10 mb-20 text-[12px] text-black">
            <Dropdown
              options={categoryOptions.map((c) => c.displayName)}
              value={activeLabel}
              onChange={(label) => {
                const found = categoryOptions.find((c) => c.displayName === label);
                if (found) setActiveCategoryId(found.id);
              }}
            />
          </div>
        </div>

        {/* Team members grid */}
        <div className="font-base gap-x-[16px] lg:gap-x-[20px] w-full grid justify-items-center grid-cols-2 lg:grid-cols-3 md:w-[60%] lg:w-[70%]">
          {isLoading ? (
            <p className="col-span-2 lg:col-span-3 text-center text-white/60 py-20">
              Loading...
            </p>
          ) : members.length === 0 ? (
            <p className="col-span-2 lg:col-span-3 text-center text-white/60 py-20">
              No team members found.
            </p>
          ) : (
            members.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.designation?.name ?? member.category.displayName}
                imageUrl={member.imageUrl}
                socialLinks={member.socialLinks ?? {}}
              />
            ))
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
