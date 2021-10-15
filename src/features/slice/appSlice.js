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
    query: 'education',
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
      console.log(pageno, '-------in state pageno');
      state.pageno = pageno;
    },
    setQuery: (state, { payload }) => {
      const { value } = payload;
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      console.log(value, '-------query value');
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
      console.log(state.pageno, '-------reset pageno');
    },
    setCountry: (state, { payload }) => {
      const { value } = payload;
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      console.log(value, '-------setCountry value');
      state.country = value;
    },
    setLanguage: (state, { payload }) => {
      const { value } = payload;
      state.pageno = 1;
      state.error = '';
      state.totalArticles = 0;
      state.news = [];
      console.log(value, '-------setLanguage value');
      state.language = value;
    },
    setLatLon: (state, { payload }) => {
      const { latitude, longitude } = payload;
      console.log(state.lat, '-----------payload lat lon', state.lon);
      if (latitude && longitude) {
        state.lat = latitude;
        state.lon = longitude;
        console.log(state.lat, '-----------lon', state.lon);
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
        console.log('payload-----------', action.payload.articles);
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
        console.log('payload-----------', action.payload);
        state.location = action.payload.name;
        state.temperature = action.payload.main.temp;
        state.weatherDescription = action.payload.weather[0].description;
        console.log(state.location, state.temperature, state.weatherDescription, '--------data');
      });
  }
});

// Action creators are generated for each case reducer function
export const { setPageNumber, setQuery, resetVariables, setCountry, setLanguage, setLatLon } =
  appSlice.actions;
export { getNewsDataAsync, getWeatherDataAsync };

export default appSlice.reducer;
