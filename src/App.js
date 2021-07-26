// Library
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Networking from "./Pages/Blog/Networking/Networking";
import Programming from "./Pages/Blog/Programming/Programming";
import Design from "./Pages/Blog/Design/Design";
import NotFound from "./Pages/404/notFound";

// Components
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/networking">
          <Networking />
        </Route>
        <Route path="/programming">
          <Programming />
        </Route>
        <Route path="/design">
          <Design />
        </Route>
        <Route path="/search/:title">
          <Search />
        </Route>
        <Route path="/detail/:slug">
          <Detail />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
