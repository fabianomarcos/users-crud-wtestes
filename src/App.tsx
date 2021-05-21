// packages
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// styles
import "assets/sass/index.scss";

// pages
import LandingPage from "ts/views/landingPage";
import Users from "ts/views/users";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
    </Switch>
  </Router>
  );
}

export default App;
