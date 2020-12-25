import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js";

import NavBar from './components/NavBar';
import AddBag from "./components/AddBag";
import AddEmployee from "./components/AddEmployee";
import AddRecord from "./components/AddRecord";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/add-bag" component={AddBag} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/add-record" component={AddRecord} /> */}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
