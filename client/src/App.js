import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Filtered from "./components/Filtered";
import Footer from "./components/Footer";
import Nav from "./components/Navbar";
import SingleBlog from "./components/SingleBlog";
import ErrorPage from "./pages/404Error";
import AddAuthor from "./pages/Admin/AddAuthor";
import AddBlog from "./pages/Admin/AddBlog";
import AddCategory from "./pages/Admin/AddCategory";
import AllBlogs from "./pages/Admin/AllBlogs";
import Dashboard from "./pages/Admin/Dashboard";
import EditBlog from "./pages/Admin/EditBlog";
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
        <Route path={"/category/:id"} component={Filtered} />
        <Route path={"/post/:id"} component={SingleBlog} />
        <Route path={"/all-posts"} component={AllBlogs} />
        <Route path={"/edit-post/:id"} component={EditBlog} />
        <Route path="*" component={ErrorPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
