import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CourseType, LearnerWithName } from "../../_types";

type userState = {
    currentUser: LearnerWithName | undefined;
    currentUserSubscribedCourses: CourseType[] | undefined;
    currentUserUnsubscribedCourses: CourseType[] | undefined;
};

const initialState: userState = {
    currentUser: undefined,
    currentUserSubscribedCourses: undefined,
    currentUserUnsubscribedCourses: undefined,
};

/*===============================
             Thunks
===============================*/

/*===============================
              Slice
===============================*/

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setCurrentUser: (
            state,
            action: PayloadAction<LearnerWithName | undefined>
        ) => {
            state.currentUser = action.payload;
        },
        setCurrentUserSubscribedCourses: (
            state,
            action: PayloadAction<CourseType[]>
        ) => {
            state.currentUserSubscribedCourses = action.payload;
        },
        setCurrentUserUnsubscribedCourses: (
            state,
            action: PayloadAction<CourseType[]>
        ) => {
            state.currentUserUnsubscribedCourses = action.payload;
        },
    },
});

/*===============================
            Actions
===============================*/

export const {
    setCurrentUser,
    setCurrentUserSubscribedCourses,
    setCurrentUserUnsubscribedCourses,
} = userSlice.actions;

/*===============================
           Selectors
===============================*/

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCurrentUserSubscribedCourses = (state: RootState) =>
    state.user.currentUserSubscribedCourses;
export const selectCurrentUserUnsubscribedCourses = (state: RootState) =>
    state.user.currentUserUnsubscribedCourses;

export default userSlice.reducer;
