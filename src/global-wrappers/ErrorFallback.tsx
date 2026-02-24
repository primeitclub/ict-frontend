import Navbar from "../client/layouts/headers/Navbar";
import { Footer } from "../client/layouts/footer/Footer";

const ErrorFallback = () => {
  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold text-center">
        Oops! Something went wrong.
      </h2>
      <Footer />
    </div>
  );
};

export default ErrorFallback;
