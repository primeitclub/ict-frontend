import { Routes, Route } from "react-router-dom";
import ClientRouter from "./app/routes/ClientRouter";
import AdminRouter from "./app/routes/AdminRouter";

function App() {
  return (
    <Routes>
      {/* client side routes */}
      <Route path="/*" element={<ClientRouter />} />

      {/* client side route */}
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;
