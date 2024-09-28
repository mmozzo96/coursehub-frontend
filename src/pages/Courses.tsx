import React from "react";
import { useCreateRecordMutation, useDeleteRecordMutation } from "../app/store";
import { useAppSelector } from "../app/hooks";
import {
    selectCurrentUser,
    selectCurrentUserSubscribedCourses,
    selectCurrentUserUnsubscribedCourses,
} from "../features/user/userSlice";
import { Flex, Heading } from "@chakra-ui/react";
import Course from "../components/Course";
import { useUrl } from "crossroad";
import MainNav from "../components/MainNav";

const CoursesPage: React.FC = () => {
    const [, setUrl] = useUrl();
    const currentUser = useAppSelector(selectCurrentUser);

    const localStorageUserId = localStorage.getItem(
        process.env.REACT_APP_LOCALSTORAGE_USER_ID_KEY!
    );
    React.useEffect(() => {
        if (!localStorageUserId) setUrl("/");
    }, []);

    const subscribed = useAppSelector(selectCurrentUserSubscribedCourses);
    const unsubscribed = useAppSelector(selectCurrentUserUnsubscribedCourses);

    const [createSubscription] = useCreateRecordMutation();
    const [deleteSubscription] = useDeleteRecordMutation();

    return (
        <>
            <MainNav />
            <Flex flexDir={"column"} alignItems={"center"} gap={4} padding={8}>
                <Heading mb={4} size="xl">
                    Available courses
                </Heading>
                {unsubscribed?.map((course) => {
                    return (
                        <Course
                            key={course.sys_id}
                            course={course}
                            onCLick={() => {
                                return createSubscription({
                                    tableName:
                                        "x_quo_coursehub_course_subscription",
                                    course: course.sys_id,
                                    learner: currentUser!.sys_id,
                                });
                            }}
                        />
                    );
                })}
                {subscribed?.map((course) => {
                    return (
                        <Course
                            key={course.sys_id}
                            course={course}
                            onCLick={() => {
                                return deleteSubscription({
                                    tableName:
                                        "x_quo_coursehub_course_subscription",
                                    record_id: course.subscription_id,
                                });
                            }}
                            isSubscribed
                        />
                    );
                })}
            </Flex>
        </>
    );
};

export default CoursesPage;
