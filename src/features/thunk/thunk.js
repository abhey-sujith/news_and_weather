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

export const getWeatherDataAsync = createAsyncThunk(
  'api/getWeatherData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { lat, lon } = getState().appdata;
      console.log(lat, lon, 'lat, lon');
      const response = await axios({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          lat,
          lon,
          appid: '7090e58dc3e20ab56ccdd81f3dbfe806'
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
