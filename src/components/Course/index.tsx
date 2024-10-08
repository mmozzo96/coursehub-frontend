import React from "react";
import { Box, Button, Flex, keyframes } from "@chakra-ui/react";
import { CoursesSubscriptionsQuery, CourseType } from "../../_types";
import { useGetTablesQuery } from "../../app/store";
import { SmallAddIcon, SpinnerIcon } from "@chakra-ui/icons";
import moment from "moment";
import { msToTimeFormat } from "../../utils/utils";

type CourseProps = {
    course: CourseType;
    onCLick: () => Promise<any>;
    isSubscribed?: boolean;
};

const Course: React.FC<CourseProps> = ({ course, onCLick, isSubscribed }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsLoading(false);
    }, [isSubscribed]);

    const subscriptionsQuery = useGetTablesQuery<CoursesSubscriptionsQuery>(
        "x_quo_coursehub_course_subscription"
    );
    const eOnCLick = () => {
        setIsLoading(true);
        onCLick().then(() => {
            subscriptionsQuery.refetch();
        });
    };

    const spinAnimation = `${spin} infinite 2s linear`;

    return (
        <Flex
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={8}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"12px 32px 24px 32px"}
            maxW={400}
            gap={2}
            boxShadow={"md"}
            bg={"gray.50"}
        >
            <Flex flexDir={"column"} gap={2}>
                <Box fontSize={20} fontWeight={600}>
                    {course.title}
                </Box>
                <Box fontSize={12}>{course.type}</Box>
                <Box mb={2}>{course.description}</Box>
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
            >
                <Box>
                    {msToTimeFormat(moment(course.duration).diff(moment(0)))}
                </Box>
                <Button
                    onClick={() => {
                        !isLoading && eOnCLick();
                    }}
                    variant={
                        isLoading
                            ? undefined
                            : isSubscribed
                            ? "outline"
                            : undefined
                    }
                    colorScheme="blue"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <SpinnerIcon animation={spinAnimation} />
                    ) : isSubscribed ? (
                        <span>Unsubscribe</span>
                    ) : (
                        <span>
                            <SmallAddIcon mr={1} mb={0.5} height={4} />
                            Subscribe{" "}
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
