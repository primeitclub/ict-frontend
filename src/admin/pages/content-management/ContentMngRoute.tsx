import { Navigate, Route, Routes } from "react-router-dom";

import {
  Faqs,
  GalleryForm,
  Gallery,
  EventsForm,
  ContentEvents,
  AboutForm,
  About,
  ContentManagementLayout,
  Hero,
  HeroForm,
  FaqsForm,
} from "..";

const ContentManagementRouter = () => {
  return (
    <Routes>
      <Route element={<ContentManagementLayout />}>
        <Route index element={<Navigate to="hero" replace />} />
        <Route path="hero">
          <Route index element={<Hero />} />
          <Route path="add" element={<HeroForm />} />
        </Route>
        <Route path="about">
          <Route index element={<About />} />
          <Route path="add" element={<AboutForm />} />
        </Route>
        <Route path="events">
          <Route index element={<ContentEvents />} />
          <Route path="add" element={<EventsForm />} />
        </Route>
        <Route path="gallery">
          <Route index element={<Gallery />} />
          <Route path="add" element={<GalleryForm />} />
        </Route>
        <Route path="faqs">
          <Route index element={<Faqs />} />
          <Route path="add" element={<FaqsForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ContentManagementRouter;
