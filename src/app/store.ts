import { configureStore, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tableDataReducer from "../features/tableData/tableDataSlice";
import userSlice from "../features/user/userSlice";
import { CoursesQuery, CoursesSubscriptionsQuery } from "../_types";

export const basicAPI = createApi({
    reducerPath: "basicAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASIC_API_URL}`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Basic ${btoa(
                    process.env.REACT_APP_USER_NAME +
                        ":" +
                        process.env.REACT_APP_USER_PSW
                )}`
            );

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTables: builder.query({
            query: (tableName: string) => tableName,
        }),
        getRecord: builder.query({
            query: ({
                tableName,
                record_id,
            }: {
                tableName: string;
                record_id: string;
            }) => tableName + "/" + record_id,
        }),
        createRecord: builder.mutation({
            query: ({
                tableName,
                ...patch
            }: Record<string, string> & { tableName: string }) => ({
                url: tableName,
                method: "POST",
                body: patch,
            }),
        }),
        deleteRecord: builder.mutation({
            query: ({
                tableName,
                record_id,
            }: {
                tableName: string;
                record_id: string;
            }) => ({
                url: tableName + "/" + record_id,
                method: "DELETE",
            }),
        }),
    }),
});
export const {
    useGetTablesQuery,
    useGetRecordQuery,
    useCreateRecordMutation,
    useDeleteRecordMutation,
} = basicAPI;

export const store = configureStore({
    reducer: {
        tableData: tableDataReducer,
        user: userSlice,
        [basicAPI.reducerPath]: basicAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(basicAPI.middleware),
});

const selectCoursesResult = basicAPI.endpoints.getTables.select(
    "x_quo_coursehub_course"
);
export const selectCourses = createSelector(
    selectCoursesResult,
    (result: CoursesQuery) => result.data?.result ?? []
);

const selectCoursesSubscriptionResult = basicAPI.endpoints.getTables.select(
    "x_quo_coursehub_course_subscription"
);
export const selectCoursesSubscription = createSelector(
    selectCoursesSubscriptionResult,
    (state: RootState) => state.user.currentUser?.sys_id,
    (result: CoursesSubscriptionsQuery, learnerId) => {
        const coursesSubscriptions = result?.data?.result;
        if (!coursesSubscriptions || !learnerId) return [];
        return coursesSubscriptions.filter(
            (courseSubscription) =>
                courseSubscription.learner.value === learnerId
        );
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
