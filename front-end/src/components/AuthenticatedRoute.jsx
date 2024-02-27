import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function AuthenticatedRoute({ signedIn, ...props }) {
  return signedIn === null ? null : signedIn ? (
    <Navigate to="/" signedIn={signedIn} />
  ) : (
    <Outlet {...props} />
  );
}

AuthenticatedRoute.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};
