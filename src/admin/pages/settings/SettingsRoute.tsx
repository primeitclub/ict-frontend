import { Navigate, Route, Routes } from "react-router-dom";
import {
  SettingsLayout,
  SocialMediaProfile,
  ContactManagement,
  PaymentSetup,
} from "..";

const SettingsRouter = () => {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<Navigate to="social-media-profile" replace />} />
        <Route path="social-media-profile" element={<SocialMediaProfile />} />
        <Route path="contact-management" element={<ContactManagement />} />
        <Route path="payment-setup" element={<PaymentSetup />} />
      </Route>
    </Routes>
  );
};

export default SettingsRouter;
