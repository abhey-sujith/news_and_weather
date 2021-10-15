import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/slice/appSlice';

export default configureStore({
  reducer: { appdata: appReducer }
});
