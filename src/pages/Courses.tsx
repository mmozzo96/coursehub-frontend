import React from "react";
import { selectCourses, selectCoursesSubscription } from "../app/store";
import { useAppSelector } from "../app/hooks";
import {
    selectCurrentUser,
    selectCurrentUserSubscribedCourses,
    selectCurrentUserUnsubscribedCourses,
} from "../features/user/userSlice";
import { Flex } from "@chakra-ui/react";
import Course from "../components/Course";
import { useUrl } from "crossroad";

const CoursesPage: React.FC = () => {
    const [, setUrl] = useUrl();
    const currentUser = useAppSelector(selectCurrentUser);
    React.useEffect(() => {
        if (!currentUser) setUrl("/");
    }, []);

    const subscribed = useAppSelector(selectCurrentUserSubscribedCourses);
    const unsubscribed = useAppSelector(selectCurrentUserUnsubscribedCourses);

    return (
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
            {subscribed?.map((course) => {
                return (
                    <Course
                        key={course.sys_id}
                        course={course}
                        subscribeOnCLick={() => {
                            /* TO DO */
                        }}
                        isSubscribed
                    />
                );
            })}
            {unsubscribed?.map((course) => {
                return (
                    <Course
                        key={course.sys_id}
                        course={course}
                        subscribeOnCLick={() => {
                            /* TO DO */
                        }}
                    />
                );
            })}
        </Flex>
    );
};

export default CoursesPage;
