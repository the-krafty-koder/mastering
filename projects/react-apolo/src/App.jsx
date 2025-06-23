import Profile from "./Profile/index";
import { BrowserRouter, Route, Routes } from "react-router";
import * as routes from "./constants/routes";
import "./App.css";
import Navigation from "./Navigation";
import Organization from "./Organization";
import { useState } from "react";

function App() {
  const [organisationName, setOrganisationName] = useState(
    "the-road-to-learn-react"
  );

  const onOrganisationSearch = (value) => {
    setOrganisationName(value);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navigation
          organisationName={organisationName}
          onOrganisationSearch={onOrganisationSearch}
        />
        <div className="app-main">
          <Routes>
            <Route
              exact
              path={routes.ORGANIZATION}
              Component={() => (
                <Organization organisationName={organisationName} />
              )}
            />
            <Route exact path={routes.PROFILE} Component={() => <Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
