import React from "react";
import {
    useCreateRecordMutation,
    useDeleteRecordMutation,
} from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import {
    selectCurrentUser,
    selectCurrentUserSubscribedCourses,
    selectCurrentUserUnsubscribedCourses,
} from "../../features/user/userSlice";
import { Flex, Heading } from "@chakra-ui/react";
import Course from "../Course";
import { useUrl } from "crossroad";

const Courses: React.FC = () => {
    const [, setUrl] = useUrl();
    const currentUser = useAppSelector(selectCurrentUser);

    const localStorageUserId = localStorage.getItem(
        process.env.REACT_APP_LOCALSTORAGE_USER_ID_KEY!
    );
    React.useEffect(() => {
        if (!localStorageUserId) setUrl("/");
    }, [localStorageUserId, setUrl]);

    const subscribed = useAppSelector(selectCurrentUserSubscribedCourses);
    const unsubscribed = useAppSelector(selectCurrentUserUnsubscribedCourses);

    const [createSubscription] = useCreateRecordMutation();
    const [deleteSubscription] = useDeleteRecordMutation();

    return (
        <>
            <Flex flexDir={"column"} alignItems={"flex-start"} padding={8}>
                <Heading mb={8} size="xl">
                    Available courses
                </Heading>
                <Flex wrap={"wrap"} gap={4}>
                    {unsubscribed
                        ?.map((course) => {
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
                        })
                        .concat(
                            subscribed?.map((course) => {
                                return (
                                    <Course
                                        key={course.sys_id}
                                        course={course}
                                        onCLick={() => {
                                            return deleteSubscription({
                                                tableName:
                                                    "x_quo_coursehub_course_subscription",
                                                record_id:
                                                    course.subscription_id,
                                            });
                                        }}
                                        isSubscribed
                                    />
                                );
                            }) || []
                        )
                        .sort((courseA, courseB) =>
                            courseA.key!?.localeCompare(courseB.key!)
                        )}
                </Flex>
            </Flex>
        </>
    );
};

export default Courses;
