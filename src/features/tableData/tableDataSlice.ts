import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LearnerWithName } from "../../_types";
import { UserQuery } from "./tableDataTypes";
import { Learner } from "../../_types/queryTypes";

type tableDataState = {
    learnersWithName: LearnerWithName[] | undefined;
};

const initialState: tableDataState = {
    learnersWithName: undefined,
};

/*===============================
             Thunks
===============================*/

export const setLearnersWithname = createAsyncThunk(
    "TableData/setLearners",
    async (learner: Learner[]) => {
        const learnersWithName: LearnerWithName[] = await Promise.all(
            learner.map(async (learner) => {
                const response = await fetch(learner.user_account.link, {
                    headers: {
                        Authorization: `Basic ${btoa(
                            process.env.REACT_APP_USER_NAME +
                                ":" +
                                process.env.REACT_APP_USER_PSW
                        )}`,
                    },
                });
                const user: { result: UserQuery } = await response.json();
                return { ...learner, name: user.result.name };
            })
        );
        return learnersWithName;
    }
);

/*===============================
              Slice
===============================*/

const tableDataslice = createSlice({
    name: "TableData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setLearnersWithname.fulfilled, (state, action) => {
            state.learnersWithName = action.payload;
        });
    },
});

/*===============================
            Actions
===============================*/

/*===============================
           Selectors
===============================*/

export const selectLearnersWithname = (state: RootState) =>
    state.tableData.learnersWithName;

export default tableDataslice.reducer;
