export { default as Dashboard } from './home/Dashboard';
export { default as Versions } from './home/Versions';

export { default as Hero } from './content-management/Hero';
export { default as About } from './content-management/About';
export { default as ContentEvents } from './content-management/Events'; // Aliased to avoid conflict if any, but since it's the only one let's just name it ContentEvents or Events
export { default as Gallery } from './content-management/Gallery';
export { default as Faqs } from './content-management/Faqs';

export { default as Speakers } from './people/Speakers';
export { default as Teams } from './people/Teams';

export { default as Categories } from './sponsors/Categories';
export { default as AllSponsors } from './sponsors/AllSponsors';
export { default as SponsorsArchive } from './sponsors/SponsorsArchive';

export { default as SocialMediaProfile } from './settings/SocialMediaProfile';
export { default as ContactManagement } from './settings/ContactManagement';
export { default as PaymentSetup } from './settings/PaymentSetup';

export { default as ContentManagementLayout } from './content-management/ContentManagementLayout';
export { default as PeopleLayout } from './people/PeopleLayout';
export { default as SponsorsLayout } from './sponsors/SponsorsLayout';
export { default as SettingsLayout } from './settings/SettingsLayout';

// Forms
export { default as HeroForm } from './content-management/HeroForm';
export { default as AboutForm } from './content-management/AboutForm';
export { default as EventsForm } from './content-management/EventsForm';
export { default as GalleryForm } from './content-management/GalleryForm';
export { default as FaqsForm } from './content-management/FaqsForm';

export { default as SpeakersForm } from './people/SpeakersForm';
export { default as TeamsForm } from './people/TeamsForm';
