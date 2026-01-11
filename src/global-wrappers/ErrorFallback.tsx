import { Header } from "../client/layouts/Header";
import { Footer } from "../client/layouts/Footer";

const ErrorFallback = () => {
  return (
    <div>
      <Header />
      <h2 className="text-2xl font-bold text-center">
        Oops! Something went wrong.
      </h2>
      <Footer />
    </div>
  );
};

export default ErrorFallback;
