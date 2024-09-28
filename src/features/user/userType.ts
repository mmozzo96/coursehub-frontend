import { CourseType } from "../../_types";

export type CourseTypeWithSubscriptionId = CourseType & {
    subscription_id: string;
};
