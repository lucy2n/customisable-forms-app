import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  user: {
    isLoggedIn: boolean,
    id: number,
    is_admin: boolean,
    name: string,
    email: string,
  };
};

const initialState = {
  isLoggedIn: false,
  id: '',
  is_admin: false,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
        state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.is_admin = action.payload;
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
  setId,
  setEmail,
  setName,
  loggedIn,
  loggedOut,
  resetUser,
  setIsAdmin
} = userSlice.actions;
export default userSlice.reducer;