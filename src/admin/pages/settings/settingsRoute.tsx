import { Navigate, Route, Routes } from "react-router-dom";
import {
  ContactManagement,
  PaymentSetup,
  SettingsLayout,
  SocialMediaProfile,
} from "..";

const SettingsRoute = () => {
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

export default SettingsRoute;
