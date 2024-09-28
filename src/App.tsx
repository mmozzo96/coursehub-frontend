import React from "react";
import {
    selectCourses,
    selectCoursesSubscription,
    useGetTablesQuery,
} from "./app/store";
import Router, { Switch, Route, useUrl } from "crossroad";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setLearnersWithname } from "./features/tableData/tableDataSlice";
import {
    CoursesQuery,
    CoursesSubscriptionsQuery,
    CourseSubscription,
    CourseType,
    LearnersQuery,
} from "./_types";
import {
    selectCurrentUser,
    setCurrentUserSubscribedCourses,
    setCurrentUserUnsubscribedCourses,
} from "./features/user/userSlice";

function App() {
    const [, setUrl] = useUrl();
    const dispatch = useAppDispatch();

    /*===============================
         UserID In localstorage
    ===============================*/

    const localStorageUserId = localStorage.getItem(
        process.env.REACT_APP_LOCALSTORAGE_USER_ID_KEY!
    );
    React.useEffect(() => {
        if (!localStorageUserId) setUrl("/");
    }, []);

    /*===============================
             Store Learners
    ===============================*/

    const learnersTableQuery = useGetTablesQuery<LearnersQuery>(
        "x_quo_coursehub_learner"
    );
    React.useEffect(() => {
        if (!learnersTableQuery.data) return;
        dispatch(setLearnersWithname(learnersTableQuery.data.result));
    }, [learnersTableQuery.data]);

    /*==============================================
        Store Courses and Courses Subscriptions
    ==============================================*/

    const subscriptionsQuery = useGetTablesQuery<CoursesSubscriptionsQuery>(
        "x_quo_coursehub_course_subscription"
    );
    const coursesQuery = useGetTablesQuery<CoursesQuery>(
        "x_quo_coursehub_course"
    );

    /*===============================
        Store User's subscription
    ===============================*/

    const courses = useAppSelector(selectCourses);
    const currentUserCoursesSubscriptions = useAppSelector(
        selectCoursesSubscription
    );
    React.useEffect(() => {
        var subscribedCourses: CourseType[] = [];
        var unsubscribedCourses: CourseType[] = [];
        courses.forEach((course) => {
            if (
                currentUserCoursesSubscriptions.find(
                    (courseSubscription) =>
                        courseSubscription.course.value === course.sys_id
                )
            )
                subscribedCourses.push(course);
            else unsubscribedCourses.push(course);
        });
        dispatch(setCurrentUserSubscribedCourses(subscribedCourses));
        dispatch(setCurrentUserUnsubscribedCourses(unsubscribedCourses));
    }, [courses, currentUserCoursesSubscriptions]);

    /*===============================
        Check if server is online
    ===============================*/

    // ============ TO DO ============ //
    // If server is hibernating queries will return errors, could use that to display an error page

    /* const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);

    React.useEffect(() => {
        const data =
            learnersTableQuery.data ||
            coursesQuery.data ||
            subscriptionsQuery.data;
    }, [learnersTableQuery, coursesQuery, subscriptionsQuery]); */

    return (
        <Switch>
            <Route path={"/"} component={LoginPage} />
            <Route path={"/main"} component={MainPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
