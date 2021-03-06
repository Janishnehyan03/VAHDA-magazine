import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateHtml from "./components/CreateHtml";
import Filtered from "./components/Filtered";
import Footer from "./components/Footer";
import LaunchBtn from "./components/LaunchBtn";
import Nav from "./components/Navbar";
import SingleBlog from "./components/SingleBlog";
import Videos from "./components/Videos";
import { UserProvider } from "./context/User";
import ErrorPage from "./pages/404Error";
import AddAuthor from "./pages/Admin/AddAuthor";
import AddBlog from "./pages/Admin/AddBlog";
import AddCategory from "./pages/Admin/AddCategory";
import AddVideo from "./pages/Admin/AddVideo";
import AllAuthors from "./pages/Admin/AllAuthors";
import AllBlogs from "./pages/Admin/AllBlogs";
import Dashboard from "./pages/Admin/Dashboard";
import EditBlog from "./pages/Admin/EditBlog";
import Authors from "./pages/Authors";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./Protected";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <Router>
      <UserProvider>
        <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/launch" component={LaunchBtn} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/html" component={CreateHtml} />
          <Route path="/create-post" component={AddBlog} />
          <Route path="/create-author" component={AddAuthor} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/create-category" component={AddCategory} />
          <Route path={"/category/:id"} component={Filtered} />
          <Route path={"/post/:id"} component={SingleBlog} />
          <Route path={"/all-posts"} component={AllBlogs} />
          <Route path={"/edit-post/:id"} component={EditBlog} />
          <Route path={"/all-authors"} component={AllAuthors} />
          <Route path={"/authors"} component={Authors} />
          <Route path={"/videos"} component={Videos} />
          <Route path={"/create-video"} component={AddVideo} />

          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
