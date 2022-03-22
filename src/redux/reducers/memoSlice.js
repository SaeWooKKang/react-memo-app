import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoDatum: [],
  doneDatum: [],
  isLoading: true,
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    put: (state, { payload }) => { state[payload.stateName] = payload.value },
    fetchLocalStorageData: ( state, action ) => { state[action.payload]= JSON.parse(localStorage.getItem(action.payload)) || []},
  }
});

export const { put, fetchLocalStorageData } = memoSlice.actions;

export default memoSlice.reducer;