import { Learner } from "../features/tableData/tableDataTypes";

export type LearnerWithName = Learner & {
    name: string;
};
