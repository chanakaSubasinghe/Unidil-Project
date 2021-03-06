import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js";

import NavBar from './components/partials/NavBar';
import AddBag from "./components/bag/AddBag";
import AddEmployee from "./components/employee/AddEmployee";
import AddRecord from "./components/record/AddRecord";
import Home from "./components/Home";
import ReadAllBags from "./components/bag/ReadAllBags";
import ReadAllEmployees from "./components/employee/ReadAllEmployees";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-bag" component={AddBag} />
          <Route exact path="/read-all-bags" component={ReadAllBags} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/read-all-employees" component={ReadAllEmployees} />
          <Route exact path="/add-record" component={AddRecord} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
