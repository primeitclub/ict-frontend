import { Navigate, Route, Routes } from "react-router-dom";
import ContentManagementLayout from "./ContentManagementLayout";
import Hero from "./Hero";
import HeroForm from "./HeroForm";
import About from "./About";
import AboutForm from "./AboutForm";
import {
  ContentEvents,
  EventsForm,
  Faqs,
  FaqsForm,
  Gallery,
  GalleryForm,
} from "..";

const ContentManagementRoutes = () => {
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

export default ContentManagementRoutes;
