import React from "react";
import {
    selectCourses,
    selectCoursesSubscription,
    useGetTablesQuery,
} from "./app/store";
import { Switch, Route, useUrl } from "crossroad";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setLearnersWithname } from "./features/tableData/tableDataSlice";
import {
    CoursesQuery,
    CoursesSubscriptionsQuery,
    CourseType,
    LearnersQuery,
} from "./_types";
import {
    setCurrentUserSubscribedCourses,
    setCurrentUserUnsubscribedCourses,
} from "./features/user/userSlice";
import { CourseTypeWithSubscriptionId } from "./features/user/userType";
import MainPage from "./pages/Main";

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

    useGetTablesQuery<CoursesSubscriptionsQuery>(
        "x_quo_coursehub_course_subscription"
    );
    useGetTablesQuery<CoursesQuery>("x_quo_coursehub_course");

    /*===============================
        Store User's subscription
    ===============================*/

    const courses = useAppSelector(selectCourses);
    const currentUserCoursesSubscriptions = useAppSelector(
        selectCoursesSubscription
    );
    React.useEffect(() => {
        var subscribedCourses: CourseTypeWithSubscriptionId[] = [];
        var unsubscribedCourses: CourseType[] = [];
        courses.forEach((course) => {
            const subscription = currentUserCoursesSubscriptions.find(
                (courseSubscription) =>
                    courseSubscription.course.value === course.sys_id
            );
            if (subscription)
                subscribedCourses.push({
                    ...course,
                    subscription_id: subscription.sys_id,
                });
            else unsubscribedCourses.push(course);
        });
        dispatch(setCurrentUserSubscribedCourses(subscribedCourses));
        dispatch(setCurrentUserUnsubscribedCourses(unsubscribedCourses));
    }, [courses, currentUserCoursesSubscriptions]);

    return (
        <Switch>
            <Route path={"/"} component={LoginPage} />
            <Route path={"/main"} component={MainPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
