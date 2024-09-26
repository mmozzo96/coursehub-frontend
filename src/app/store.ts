import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        [basicAPI.reducerPath]: basicAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(basicAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
