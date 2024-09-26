import React from "react";
import { useGetTablesQuery } from "./app/store";
import Router, { Switch, Route } from "crossroad";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import NotFound from "./pages/NotFound";

function App() {
    const learnerTableQuery = useGetTablesQuery("x_quo_coursehub_learner");

    React.useEffect(() => {
        console.log(learnerTableQuery.data);
    }, [learnerTableQuery.data]);

    return (
        <Router>
            <Switch>
                <Route path={"/"} component={LoginPage} />
                <Route path={"/main"} component={MainPage} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
