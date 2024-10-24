import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../entities/user/model/userSlice';
import searchTemplatesReducer from '../features/search-templates/model/searchTemplatesSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchByInputTemp: searchTemplatesReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
