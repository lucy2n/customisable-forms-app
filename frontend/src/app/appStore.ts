import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../entities/user/model/userSlice';
import searchByInputTemp from '../features/search-templates/ui/search-templates';

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchByInputTemp: searchByInputTemp,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;