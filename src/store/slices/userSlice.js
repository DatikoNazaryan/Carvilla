import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import fakeFetch from '../../helpers/client';
import storage  from "../../helpers/storage";

const initialState = {
    allUsersModel: [],
    user: JSON.parse(storage.getString('user')),
    loading: true,
    errore: null,
};

export const fetchAllUsersModelAsync = createAsyncThunk(
    'allUsersModel/fetchAllUsersModel',
    async (params, { rejectWithValue }) => {
        try{
            return await fakeFetch("allUsersModel");
        } catch(error) {
            return rejectWithValue(error);
        }
    }
);


const userSlice = createSlice({
    name: 'allUsersModel',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        deleteUsersData(state, action) {
            const newUsersDataList = state.allUsersModel.filter(item => item.id !== action.payload);
            storage.setString('allUsersModel', JSON.stringify(newUsersDataList));
            state.allUsersModel = newUsersDataList;
        },
        updateUsersList(state, action) {
            const newUsersList = state.allUsersModel.map(item => {
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updateValues
                    };
                }

                return item;
            });

            state.allUsersModel = newUsersList;
            storage.setString('allUsersModel', JSON.stringify(newUsersList));
        },
        updateUserisFavorite (state, action) {
            const updatedUser = {...state.user, favoriteIds: state.user.favoriteIds.includes(action.payload) ? state.user.favoriteIds.filter(item => item !== action.payload) : [...state.user.favoriteIds, action.payload] };
            const updatedUsersList = state.allUsersModel.map(item => {
                if (item.id === updatedUser.id) return updatedUser;

                return item;
            });
            state.user = updatedUser;
            state.allUsersModel = updatedUsersList;
            storage.setString('user', JSON.stringify(updatedUser));
            storage.setString('allUsersModel', JSON.stringify(updatedUsersList));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersModelAsync.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchAllUsersModelAsync.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.allUsersModel = action.payload;
            })
            .addCase(fetchAllUsersModelAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { updateUserisFavorite, setUser, deleteUsersData, updateUsersList } = userSlice.actions;

export default userSlice.reducer;
