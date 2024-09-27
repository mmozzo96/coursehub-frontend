import React from "react";
import { useGetTablesQuery } from "../app/store";
import { CourseQuery } from "../_types";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../features/user/userSlice";
import { Flex } from "@chakra-ui/react";
import Course from "../components/Course";

const MainPage: React.FC = () => {
    const coursesQuery = useGetTablesQuery<CourseQuery>(
        "x_quo_coursehub_course"
    );

    const currentUser = useAppSelector(selectCurrentUser);
    React.useEffect(() => console.log(currentUser?.name), [currentUser]);

    return (
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
            {coursesQuery.data &&
                coursesQuery.data.result.map((course) => (
                    <Course key={course.sys_id} course={course} />
                ))}
        </Flex>
    );
};

export default MainPage;
