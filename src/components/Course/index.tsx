import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { CourseType } from "../../_types";

type CourseProps = {
    course: CourseType;
    subscribeOnCLick: () => void;
};

const Course: React.FC<CourseProps> = ({ course, subscribeOnCLick }) => {
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
                <Button onClick={() => subscribeOnCLick()}>Subscribe</Button>
            </Flex>
        </Flex>
    );
};

export default Course;
