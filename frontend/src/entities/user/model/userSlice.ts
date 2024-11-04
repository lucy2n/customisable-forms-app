import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  isLoggedIn: boolean;
  id: string;
  is_admin: boolean;
  name: string;
  email: string;
  salesforce_id?: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  id: '',
  is_admin: false,
  name: '',
  email: '',
  salesforce_id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state: UserState, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setName: (state: UserState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsAdmin: (state: UserState, action: PayloadAction<boolean>) => {
      state.is_admin = action.payload;
    },
    loggedIn: (state: UserState) => {
      state.isLoggedIn = true;
    },
    loggedOut: (state: UserState) => {
      state.isLoggedIn = false;
    },
    resetUser: (state: UserState) => {
      Object.assign(state, initialState);
    },
    setSalesforceId: (state: UserState, action: PayloadAction<string>) => {
      state.salesforce_id = action.payload;
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
  setIsAdmin,
  setSalesforceId
} = userSlice.actions;

export default userSlice.reducer;