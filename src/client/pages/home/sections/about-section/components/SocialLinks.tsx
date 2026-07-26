import SocialIcon from "../../../../../components/social-icon/SocialIcon";
import { useSiteSettings } from "../../../../../hooks/use-site-settings";
import {
  hasSocialIcon,
  getSocialLabel,
} from "../../../../../components/social-icon/socialIcons";

const SocialLinks = () => {
  const { data: siteSettings } = useSiteSettings();

  // Same source the footer uses: render every configured platform we have an
  // icon for, skipping unknown ones. No configured socials → nothing rendered.
  const socialLinks = (siteSettings?.socialMediaLinks ?? []).filter((l) =>
    hasSocialIcon(l.platform),
  );

  if (socialLinks.length === 0) return null;

  return (
    <div className="flex gap-4 mt-4 md:mt-6 lg:mt-10 xl:mt-36 justify-start">
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.link || "#"}
          target={social.link ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="cursor-pointer"
          aria-label={getSocialLabel(social.platform)}
        >
          <SocialIcon
            platform={social.platform}
            className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
