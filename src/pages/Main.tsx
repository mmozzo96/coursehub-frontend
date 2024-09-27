import React from "react";
import { selectCourses, selectCoursesSubscription } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../features/user/userSlice";
import { Flex } from "@chakra-ui/react";
import Course from "../components/Course";

const MainPage: React.FC = () => {
    const courses = useAppSelector(selectCourses);

    const currentUser = useAppSelector(selectCurrentUser);
    const currentUserCoursesSubscriptions = useAppSelector(
        selectCoursesSubscription
    );

    return (
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
            {courses.map((course) => {
                const isCurrentUserSubscribed =
                    currentUserCoursesSubscriptions.find(
                        (courseSubscription) =>
                            courseSubscription.course.value === course.sys_id
                    );
                console.log(isCurrentUserSubscribed);
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

export default MainPage;
