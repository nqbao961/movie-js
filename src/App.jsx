import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import routes from "./routes";

function App() {
  return (
    <>
      <TopNavigation />
      <Switch>
        {routes.map((route, index) => (
          <Route key={`route-${index}`} {...route} />
        ))}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
