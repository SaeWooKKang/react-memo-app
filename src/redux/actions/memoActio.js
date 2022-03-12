import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMemos = createAsyncThunk(
  'memo/fetchMemo',
  async () => {
    const response =  window.localStorage.getItem('todoDatum');
    return response;
  }
);

