import { createSlice } from '@reduxjs/toolkit';
import { getNewsDataAsync } from '../thunk/thunk';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    news: [],
    totalArticles: 0,
    error: '',
    pageno: 1,
    query: 'education',
    language: 'en',
    country: 'in',
    status: 'idle'
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
      });
  }
});

// Action creators are generated for each case reducer function
export const { setPageNumber, setQuery, resetVariables, setCountry, setLanguage } =
  appSlice.actions;
export { getNewsDataAsync };

export default appSlice.reducer;
