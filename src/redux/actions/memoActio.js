import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMemos = createAsyncThunk(
  'memo/getMemos',
  async () => {
    const response = await window.localStorage.getItem('todoDatum')
  }
);

