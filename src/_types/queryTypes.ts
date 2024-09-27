export type Learner = {
    admission_date: string;
    sys_created_by: string;
    sys_created_on: string;
    sys_id: string;
    sys_mod_count: string;
    sys_tags: string;
    sys_updated_by: string;
    sys_updated_on: string;
    user_account: {
        link: string;
        value: string;
    };
};

export type LearnersQuery = Record<string, any> & {
    data?: { result: Learner[] };
};

export type CourseType = {
    description: string;
    duration: string;
    number: string;
    sys_created_by: string;
    sys_created_on: string;
    sys_id: string;
    sys_mod_count: string;
    sys_tags: string;
    sys_updated_by: string;
    sys_updated_on: string;
    title: string;
    type: string;
};

export type CoursesQuery = Record<string, any> & {
    data?: { result: CourseType[] };
};

export type CourseSubscription = {
    sys_id: string;
    sys_updated_by: string;
    sys_created_on: string;
    learner: {
        link: string;
        value: string;
    };
    sys_mod_count: string;
    course: {
        link: string;
        value: string;
    };
    sys_updated_on: string;
    sys_tags: string;
    sys_created_by: string;
    subscription_date: string;
};

export type CoursesSubscriptionsQuery = Record<string, any> & {
    data?: { result: CourseSubscription[] };
};
