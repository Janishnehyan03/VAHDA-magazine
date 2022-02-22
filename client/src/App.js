import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Navbar";
import ErrorPage from "./pages/404Error";
import AddAuthor from "./pages/Admin/AddAuthor";
import AddBlog from "./pages/Admin/AddBlog";
import AddCategory from "./pages/Admin/AddCategory";
import Dashboard from "./pages/Admin/Dashboard";
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
        <Route path="/create-author" component={AddAuthor} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create-category" component={AddCategory} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
