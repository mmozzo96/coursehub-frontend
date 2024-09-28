import React from "react";
import { useDeleteRecordMutation } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUserSubscribedCourses } from "../../features/user/userSlice";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import Course from "../Course";
import { useUrl } from "crossroad";

type MySubscriptionProps = {
    sendToAllCourses: () => void;
};

const MySubscriptions: React.FC<MySubscriptionProps> = ({
    sendToAllCourses,
}) => {
    const [, setUrl] = useUrl();

    const localStorageUserId = localStorage.getItem(
        process.env.REACT_APP_LOCALSTORAGE_USER_ID_KEY!
    );
    React.useEffect(() => {
        if (!localStorageUserId) setUrl("/");
    }, [localStorageUserId, setUrl]);

    const subscribed = useAppSelector(selectCurrentUserSubscribedCourses);
    const [deleteSubscription] = useDeleteRecordMutation();

    return (
        <>
            <Flex flexDir={"column"} alignItems={"flex-start"} padding={8}>
                <Heading mb={8} size="xl">
                    Courses you are subscribed to
                </Heading>
                {subscribed?.length !== 0 ? (
                    <Flex wrap={"wrap"} gap={4}>
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
                ) : (
                    <Box>
                        You aren't subscribed to any course. You can{" "}
                        <Link
                            onClick={() => sendToAllCourses()}
                            fontWeight={"bold"}
                        >
                            check out our corses
                        </Link>{" "}
                        and pick the ones you like the best
                    </Box>
                )}
            </Flex>
        </>
    );
};

export default MySubscriptions;
