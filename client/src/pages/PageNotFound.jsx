import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-4">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
