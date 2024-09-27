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
            query: ({ tableName, record_id }) => tableName + "/" + record_id,
        }),
        createRecord: builder.mutation({
            query: ({ tablename, ...patch }) => ({
                url: tablename,
                method: "POST",
                body: patch,
            }),
        }),
        updateRecord: builder.mutation({
            query: ({ tablename, ...patch }) => ({
                url: tablename,
                method: "PUT",
                body: patch,
            }),
        }),
    }),
});
export const {
    useGetTablesQuery,
    useCreateRecordMutation,
    useUpdateRecordMutation,
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
