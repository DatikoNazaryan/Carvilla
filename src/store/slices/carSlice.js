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
    searchedCarsModel: [],
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
            state.searchedCarsModel = newCarsDataList;
        },
        setSortedCars(state, action) {
            state.sortedCars = action.payload;
        },
        deleteCar(state, action) {
            const newCarsList = state.allCarsModel.filter(car => car.id !== action.payload);
            state.allCarsModel = newCarsList;
            state.searchedCarsModel = newCarsList;
            storage.setString('allCarsModel', JSON.stringify(newCarsList));
        },
      updateCar(state, action) {
        const updatedCarsList = state.allCarsModel.map(item => {
          if(item.id === action.payload.id){
            return {
              ...item,
              ...action.payload
            };
          }
          return item;
        });
        state.allCarsModel = updatedCarsList;
        state.searchedCarsModel = updatedCarsList;
        storage.setString('allCarsModel', JSON.stringify(updatedCarsList));
      },
      deletePhoto(state, action) {
        const updatedCarsList = state.allCarsModel.map(item => {
          if(item.id === action.payload.id){
            return {
              ...item,
              imageUris: item.imageUris.filter(image => image !== action.payload.imageUri)
            };
          }
          return item;
        });
        state.allCarsModel = updatedCarsList;
        state.searchedCarsModel = updatedCarsList;
        storage.setString('allCarsModel', JSON.stringify(updatedCarsList));
      },
      setSearchedCarsModel(state, action) {
         const newSearchedCarsList = state.allCarsModel.filter(item => (item.model.toLowerCase().includes(action.payload.toLowerCase())));
         state.searchedCarsModel = newSearchedCarsList;
      }
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
              state.searchedCarsModel = action.payload;
           })
           .addCase(fetchAllCardsModelAsync.rejected, (state, action) => {
              state.error = action.payload;
              state.loading = false;
           })
    }
});

export const { setSearchedCarsModel, deletePhoto ,updateCar,deleteCar, setSortedCars, setSortBy, setFilterBy, carAutherDelete } = carSlice.actions;

export default carSlice.reducer;
