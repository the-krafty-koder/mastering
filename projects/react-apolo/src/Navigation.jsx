import { Link, useLocation } from "react-router";
import OrganizationSearch from "./OrganisationSearch";
import * as routes from "./constants/routes";

const Navigation = ({ organisationName, onOrganisationSearch }) => {
  const { pathname } = useLocation();
  return (
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div className="Navigation-link">
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>
      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch
          organisationName={organisationName}
          onOrganisationSearch={onOrganisationSearch}
        />
      )}
    </header>
  );
};
export default Navigation;
