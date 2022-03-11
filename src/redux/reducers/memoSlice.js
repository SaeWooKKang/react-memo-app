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
  }
});

export const { isLoading } = memoSlice.actions;

export default memoSlice.reducer;