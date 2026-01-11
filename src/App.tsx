import { Routes, Route } from "react-router-dom";
import ClientRouter from "./routes/ClientRouter";

function App() {
  return (
    <Routes>
      {/* client side routes */}
      <Route path="/*" element={<ClientRouter />} />

      {/* client side route */}
      {/* <Route path="/admin/*" element={<AdminRouter />} /> */}
    </Routes>
  );
}

export default App;
