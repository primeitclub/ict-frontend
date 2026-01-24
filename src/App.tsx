import { Routes, Route } from "react-router-dom";
import ClientRouter from "./app/routes/ClientRouter";
import AdminRouter from "./app/routes/AdminRouter";
import { AboutSection } from "./components/sections/AboutSection/index";

function App() {
  return (
    <Routes>
      {/* client side routes */}
      <Route path="/*" element={<ClientRouter />} />

      {/* client side route */}
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/about" element={<AboutSection />} />
    </Routes>
  );
}

export default App;
