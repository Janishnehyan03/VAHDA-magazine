import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Navbar";
import AddBlog from "./pages/Admin/AddBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <Router>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create-post" component={AddBlog} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
