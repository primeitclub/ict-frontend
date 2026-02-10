import Navbar from "../client/components/navigate/Navbar";
import { Footer } from "../client/components/footer/Footer";

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
