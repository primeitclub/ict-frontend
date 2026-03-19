import { SOCIAL_LINKS } from "../data";

const SocialLinks = () => {
  return (
    <div className="flex gap-4 mt-4 md:mt-6 lg:mt-10 xl:mt-36 justify-start">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 cursor-pointer"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
