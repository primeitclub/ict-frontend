import { Navigate, Route, Routes } from "react-router-dom";
import { Categories, AllSponsors, SponsorsArchive, SponsorsLayout } from "..";

const SponsorsRouter = () => {
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

export default SponsorsRouter;
