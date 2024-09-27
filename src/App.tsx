import React from "react";
import { useGetTablesQuery } from "./app/store";
import Router, { Switch, Route } from "crossroad";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import NotFound from "./pages/NotFound";
import { useAppDispatch } from "./app/hooks";
import { setLearnersWithname } from "./features/tableData/tableDataSlice";
import { LearnersQuery } from "./_types";

function App() {
    const dispatch = useAppDispatch();

    const learnersTableQuery = useGetTablesQuery<LearnersQuery>(
        "x_quo_coursehub_learner"
    );
    React.useEffect(() => {
        if (!learnersTableQuery.data) return;
        dispatch(setLearnersWithname(learnersTableQuery.data.result));
    }, [learnersTableQuery.data]);

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
