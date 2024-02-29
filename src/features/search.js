import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resultProducts: [],
    filteredProducts: [],
    isLoading: true,
    isSorting: true,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchProducts: (state, action) => {
            state.filteredProducts = action.payload;
            state.resultProducts = action.payload;
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload
        },
        setResultProducuts: (state, action) => {
            state.resultProducts = action.payload
        },
        setSearchLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setSearchSorting: (state, action) => {
            state.isSorting = action.payload
        },
    }
})

export const { setFilteredProducts, setSearchLoading, setSearchProducts, setResultProducuts, setSearchSorting } = searchSlice.actions;
export default searchSlice