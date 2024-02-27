import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ signedIn, ...props }) {
  return signedIn === null ? null : signedIn ? (
    <Outlet {...props} />
  ) : (
    <Navigate to="/auth" signedIn={signedIn} />
  );
}

PrivateRoute.propTypes = {
  signedIn: PropTypes.bool,
};
