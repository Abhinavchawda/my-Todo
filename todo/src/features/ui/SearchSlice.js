import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchString: ""
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers : {
        updateSearch(state, action) {
            state.searchString = action.payload;
        }
    }
});

export const { updateSearch } = searchSlice.actions;

export const selectSearch = (state) => state.search.searchString;

export default searchSlice.reducer;