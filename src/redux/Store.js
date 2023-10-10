import { configureStore } from '@reduxjs/toolkit';
import GetSlice from './slices/GetSlice';
import DelSlice from './slices/DelSlice';


const Store = configureStore({
  reducer: {
    getData: GetSlice,
    deleteData: DelSlice,
  },
});

export default Store;