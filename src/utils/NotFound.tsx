import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="error-wrapper">
      <div className="error-content">
        <h1
          style={{
            fontWeight: "900",
            fontSize: "250px",
            backgroundClip: "text",
          }}
        >
          404
        </h1>
        <div className="error-inner-content">
          <h2>Oops! Page Not Found</h2>
          <p className="mb-4">The page you requested could not be found</p>
          <Link to="/">Return Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
