import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LearnerWithName } from "../../_types";

type userState = {
    currentUser: LearnerWithName | undefined;
};

const initialState: userState = {
    currentUser: undefined,
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
        setCurrentUser: (state, action: PayloadAction<LearnerWithName>) => {
            state.currentUser = action.payload;
        },
    },
});

/*===============================
            Actions
===============================*/

export const { setCurrentUser } = userSlice.actions;

/*===============================
           Selectors
===============================*/

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
