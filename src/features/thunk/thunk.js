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
          token: process.env.REACT_APP_NEWS_API_TOKEN,
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
      // const res = await axios.get('https://geolocation-db.com/json/')
      const { lat, lon } = getState().appdata;
      console.log(lat, lon, 'lat, lon');
      const response = await axios({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_WEATHER_API_TOKEN
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
