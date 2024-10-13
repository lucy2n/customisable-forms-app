import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  user: {
    isLoggedIn: boolean,
    name: string,
    email: string,
  };
};

const initialState = {
  isLoggedIn: false,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setEmail,
  setName,
  loggedIn,
  loggedOut,
  resetUser,
} = userSlice.actions;
export default userSlice.reducer;