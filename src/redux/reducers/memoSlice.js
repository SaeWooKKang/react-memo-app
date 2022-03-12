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
    isLoading: (state, action) => { state.isLoading = action.payload },
    fetchLocalStorageData: ( state, action ) => { state[action.payload]= JSON.parse(localStorage.getItem(action.payload)) || []},
    setTodoDatum: (state, action) => {state.todoDatum = [...state.todoDatum, ...action.payload]},
    setDoneDatum: (state, action) => {state.doneDatum = [...action.payload]},
    deleteTodoDatum: (state, action) => {state.todoDatum = [...action.payload]},
    deleteDoneDatum: (state, action) => {state.doneDatum = [...action.payload]}

  }
});

export const { isLoading, fetchLocalStorageData, setTodoDatum, deleteTodoDatum, setDoneDatum, deleteDoneDatum } = memoSlice.actions;

export default memoSlice.reducer;