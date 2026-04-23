import { Navigate, Route, Routes } from "react-router-dom";
import { AllSponsors, Categories, SponsorsArchive, SponsorsLayout } from "..";

const SponsorsRoute = () => {
  return (
    <Routes>
      <Route element={<SponsorsLayout />}>
        <Route index element={<Navigate to="categories" replace />} />
        <Route path="categories" element={<Categories />} />
        <Route path="all-sponsors" element={<AllSponsors />} />
        <Route path="archive" element={<SponsorsArchive />} />
      </Route>
    </Routes>
  );
};

export default SponsorsRoute;
