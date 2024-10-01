/* eslint-disable react/prop-types */
import "./Error.css";

function Error({ error = 404, message = "Page not found" }) {
  return (
    <div className="error">
      <h1>{error}</h1>
      <p>{message}</p>
    </div>
  );
}

export default Error;
