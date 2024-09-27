import { Learner } from "./queryTypes";
export * from "./queryTypes";

export type LearnerWithName = Learner & {
    name: string;
};
