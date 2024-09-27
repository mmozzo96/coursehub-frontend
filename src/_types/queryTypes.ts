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

export type Course = {
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

export type CourseQuery = Record<string, any> & {
    data?: { result: Course[] };
};
