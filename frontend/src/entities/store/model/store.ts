export interface RootState {
    user: {
      id: string;
      is_admin: boolean;
      isLoggedIn: boolean;
      name: string;
      email: string;
    };
};