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

export type LearnersQuery = {
    result: Learner[];
};

export type UserQuery = Record<string, string> & { name: string };
