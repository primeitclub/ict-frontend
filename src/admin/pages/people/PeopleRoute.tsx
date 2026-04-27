import { Navigate, Route, Routes } from "react-router-dom";
import { PeopleLayout, Speakers, SpeakersForm, Teams, TeamsForm } from "..";

const PeopleRouter = () => {
  return (
    <Routes>
      <Route element={<PeopleLayout />}>
        <Route index element={<Navigate to="speakers" replace />} />
        <Route path="speakers">
          <Route index element={<Speakers />} />
          <Route path="add" element={<SpeakersForm />} />
        </Route>
        <Route path="teams">
          <Route index element={<Teams />} />
          <Route path="add" element={<TeamsForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default PeopleRouter;
