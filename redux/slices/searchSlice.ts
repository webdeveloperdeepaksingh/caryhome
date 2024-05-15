import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: "",
    reducers: {
        productByQuery: (state, action) => {
            const {itemByQuery} = action.payload;
            return itemByQuery;
        },
    },
});

export const { productByQuery } = searchSlice.actions;
export default searchSlice.reducer;
