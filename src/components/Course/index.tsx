import React from "react";
import { Box, Button, Flex, keyframes } from "@chakra-ui/react";
import { CoursesSubscriptionsQuery, CourseType } from "../../_types";
import { useGetTablesQuery } from "../../app/store";
import {
    CheckIcon,
    CloseIcon,
    DeleteIcon,
    SpinnerIcon,
} from "@chakra-ui/icons";

type CourseProps = {
    course: CourseType;
    onCLick: () => Promise<any>;
    isSubscribed?: boolean;
};

const Course: React.FC<CourseProps> = ({ course, onCLick, isSubscribed }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const subscriptionsQuery = useGetTablesQuery<CoursesSubscriptionsQuery>(
        "x_quo_coursehub_course_subscription"
    );
    const eOnCLick = () => {
        setIsLoading(true);
        onCLick().then(() => subscriptionsQuery.refetch());
    };

    const spinAnimation = `${spin} infinite 2s linear`;

    return (
        <Flex
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={8}
            flexDirection={"column"}
            alignItems={"center"}
            p={"12px 32px 24px 32px"}
            w={700}
            gap={1}
            boxShadow={"md"}
            bg={"gray.50"}
        >
            <Box fontSize={20} fontWeight={600}>
                {course.title}
            </Box>
            <Box>{course.description}</Box>
            <Flex justifyContent={"flex-end"} width={"100%"}>
                <Button
                    onClick={() => eOnCLick()}
                    colorScheme={
                        isLoading ? undefined : isSubscribed ? "red" : "green"
                    }
                    w={150}
                >
                    {isLoading ? (
                        <SpinnerIcon animation={spinAnimation} />
                    ) : isSubscribed ? (
                        <span>
                            Unsubscribe <DeleteIcon ml={1} mb={1} height={4} />
                        </span>
                    ) : (
                        <span>
                            Subscribe <CheckIcon ml={2} mb={0.5} height={4} />
                        </span>
                    )}
                </Button>
            </Flex>
        </Flex>
    );
};

export default Course;

const spin = keyframes`  
  from {transform: rotate(0deg);}   
  to {transform: rotate(360deg)} 
`;
