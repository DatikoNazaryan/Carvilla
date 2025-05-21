import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import fakeFetch from "../../helpers/client";
import storage  from "../../helpers/storage";

const initialState = {
    allCarsModel: [],
    loading: true,
    errore: null,
    sortedCars: [],
    sortBy: "asc",
    filterBy: "all",
};


export const fetchAllCardsModelAsync = createAsyncThunk(
    'allCarsModel/fetchAllCarsModel',
    async (params, { rejectWithValue }) => {
        try{
            return await fakeFetch("allCarsModel");
        } catch(error) {
            return rejectWithValue(error);
        }
    }
);

const carSlice = createSlice({
    name: 'allCarsModel',
    initialState,
    reducers: {
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setFilterBy(state, action) {
            state.filterBy = action.payload;
        },
        carAutherDelete(state, action) {
            const newCarsDataList = state.allCarsModel.filter(item => item.authorId !== action.payload);
            storage.setString('allCarsModel', JSON.stringify(newCarsDataList));
            state.allCarsModel = newCarsDataList;
        },
        setSortedCars(state, action) {
            state.sortedCars = action.payload;
        },
        deleteCar(state, action) {
            const newCarsList = state.allCarsModel.filter(car => car.id !== action.payload);
            state.allCarsModel = newCarsList;
            storage.setString('allCarsModel', JSON.stringify(newCarsList));
        },
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchAllCardsModelAsync.pending, (state) => {
              state.error = null;
              state.loading = true;
           })
           .addCase(fetchAllCardsModelAsync.fulfilled, (state, action) => {
              state.error = null;
              state.loading = false;
              state.allCarsModel = action.payload;
           })
           .addCase(fetchAllCardsModelAsync.rejected, (state, action) => {
              state.error = action.payload;
              state.loading = false;
           })
    }
});

export const { deleteCar, setSortedCars, setSortBy, setFilterBy, carAutherDelete } = carSlice.actions;

export default carSlice.reducer;
