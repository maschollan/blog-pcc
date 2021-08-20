// Library
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

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
import Test from "./Pages/Test/Content";
import Edit from "./Pages/Test/Edit";
import Create from "./Pages/Test/Create";
import Login from "./Pages/Test/Login";

import Layout from "./Components/Layout";
import GetDataLoading from "./Components/GetDataLoading";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common";

function App() {
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            return;
        }

        axios
            .get(`http://localhost:4000/verifyToken?token=${token}`)
            .then((response) => {
                setUserSession(response.data.token, response.data.user);
                setAuthLoading(false);
            })
            .catch((error) => {
                removeUserSession();
                setAuthLoading(false);
            });
    }, []);

    if (authLoading && getToken()) {
        return (
            <Layout>
                <GetDataLoading />
            </Layout>
        );
    }

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <PublicRoute path='/login' component={Login} />
                <PrivateRoute path='/content' component={Test} />
                <PrivateRoute path='/create' component={Create} />
                <PrivateRoute path='/edit/:id' component={Edit} />
                <Route path='/networking'>
                    <Networking />
                </Route>
                <Route path='/programming'>
                    <Programming />
                </Route>
                <Route path='/design'>
                    <Design />
                </Route>
                <Route path='/search/:title'>
                    <Search />
                </Route>
                <Route path='/detail/:slug'>
                    <Detail />
                </Route>
                <Route path='*'>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
