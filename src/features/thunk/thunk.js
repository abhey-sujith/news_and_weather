import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNewsDataAsync = createAsyncThunk(
  'api/getNewsData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { pageno, query, language, country } = getState().appdata;
      console.log(pageno, '------------pgno');
      const response = await axios({
        method: 'GET',
        url: 'https://gnews.io/api/v4/search',
        params: {
          q: query,
          page: pageno,
          token: '3eb4cdc4279cda784cacc8f52c5fea58',
          lang: language,
          country
        }
      });
      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);
