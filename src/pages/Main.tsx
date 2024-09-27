import React from "react";
import { useGetTablesQuery } from "../app/store";
import { CourseQuery } from "../_types";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../features/user/userSlice";

const MainPage: React.FC = () => {
    const coursesQuery = useGetTablesQuery<CourseQuery>(
        "x_quo_coursehub_course"
    );

    const currentUser = useAppSelector(selectCurrentUser);
    React.useEffect(() => console.log(currentUser?.name), [currentUser]);

    return (
        <div>
            {coursesQuery.data &&
                coursesQuery.data.result.map((course) => (
                    <div key={course.sys_id}>{course.title}</div>
                ))}
        </div>
    );
};

export default MainPage;
