import { createSlice } from '@reduxjs/toolkit';
import { getNewsDataAsync, getWeatherDataAsync } from '../thunk/thunk';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    news: [],
    totalArticles: 0,
    error: '',
    weatherError: '',
    pageno: 1,
    query: 'breaking-news world nation business technology entertainment sports science health',
    language: 'en',
    country: 'in',
    status: 'idle',
    weatherStatus: 'idle',
    lat: undefined,
    lon: undefined,
    weatherDescription: '',
    temperature: null,
    location: ''
  },
  reducers: {
    setPageNumber: (state, { payload }) => {
      const { pageno } = payload;
      state.pageno = pageno;
    },
    setQuery: (state, { payload }) => {
      const { value } = payload;
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      state.query = value;
    },
    resetVariables: (state) => {
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      state.query = 'education';
      state.language = 'en';
      state.country = 'in';
      state.status = 'idle';
    },
    setCountry: (state, { payload }) => {
      const { value } = payload;
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      state.country = value;
    },
    setLanguage: (state, { payload }) => {
      const { value } = payload;
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      state.language = value;
    },
    setLatLon: (state, { payload }) => {
      const { latitude, longitude } = payload;
      if (latitude && longitude) {
        state.lat = latitude;
        state.lon = longitude;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNewsDataAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(getNewsDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.totalArticles = action.payload.totalArticles;
        state.news = [...state.news, ...action.payload.articles];
      })
      .addCase(getWeatherDataAsync.pending, (state) => {
        state.weatherStatus = 'loading';
      })
      .addCase(getWeatherDataAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.weatherError = action.error;
      })
      .addCase(getWeatherDataAsync.fulfilled, (state, action) => {
        state.weatherStatus = 'idle';
        state.location = action.payload.name;
        state.temperature = action.payload.main.temp;
        state.weatherDescription = action.payload.weather[0].description;
      });
  }
});

// Action creators are generated for each case reducer function
export const { setPageNumber, setQuery, resetVariables, setCountry, setLanguage, setLatLon } =
  appSlice.actions;
export { getNewsDataAsync, getWeatherDataAsync };

export default appSlice.reducer;
