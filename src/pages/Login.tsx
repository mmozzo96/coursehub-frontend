import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectLearnersWithname } from "../features/tableData/tableDataSlice";

const LoginPage: React.FC = () => {
    const learnersWithName = useAppSelector(selectLearnersWithname);

    return (
        <div>
            {learnersWithName?.map((learnerWithName) => (
                <div key={learnerWithName.sys_id}>{learnerWithName.name}</div>
            ))}
        </div>
    );
};

export default LoginPage;
