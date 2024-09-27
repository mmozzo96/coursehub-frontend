import React from "react";
import { useGetTablesQuery } from "./app/store";
import Router, { Switch, Route, useUrl } from "crossroad";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import NotFound from "./pages/NotFound";
import { useAppDispatch } from "./app/hooks";
import { setLearnersWithname } from "./features/tableData/tableDataSlice";
import { CoursesQuery, LearnersQuery } from "./_types";

function App() {
    const [, setUrl] = useUrl();
    const dispatch = useAppDispatch();

    const localStorageUserId = localStorage.getItem(
        process.env.REACT_APP_LOCALSTORAGE_USER_ID_KEY!
    );
    React.useEffect(() => {
        if (!localStorageUserId) setUrl("/");
    }, []);

    const learnersTableQuery = useGetTablesQuery<LearnersQuery>(
        "x_quo_coursehub_learner"
    );
    React.useEffect(() => {
        if (!learnersTableQuery.data) return;
        dispatch(setLearnersWithname(learnersTableQuery.data.result));
    }, [learnersTableQuery.data]);

    useGetTablesQuery<LearnersQuery>("x_quo_coursehub_course_subscription");
    useGetTablesQuery<CoursesQuery>("x_quo_coursehub_course");

    return (
        <Switch>
            <Route path={"/"} component={LoginPage} />
            <Route path={"/main"} component={MainPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
