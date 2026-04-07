import type { IDepartment } from "../types";

const DepartmentCard = ({ department, contacts }: IDepartment) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-white font-bold text-base lg:text-xl">
        {department}
      </h3>
      <div className="flex flex-col gap-0.5">
        {contacts.map((contact, i) => (
          <p key={i} className="text-white/80 text-sm lg:text-base">
            {contact.name} ({contact.phone})
          </p>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCard;
