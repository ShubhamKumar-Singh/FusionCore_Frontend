import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const initialState: User[] = [
  {
    id: '1',
    name: 'Phillip Mckenna',
    email: 'phillip.mckenna@example.com',
    role: 'Admin',
    status: 'Awaiting file upload',
  },
  {
    id: '2',
    name: 'Lisa Radley',
    email: 'lisa.radley@example.com',
    role: 'User',
    status: 'Awaiting file upload',
  },
  {
    id: '3',
    name: 'Patrick Sampson',
    email: 'patrick.sampson@example.com',
    role: 'User',
    status: 'Awaiting file upload',
  },
  {
    id: '4',
    name: 'Peter Simpson',
    email: 'peter.simpson@example.com',
    role: 'User',
    status: 'Awaiting file upload',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteUser(state, action: PayloadAction<string>) {
      return state.filter(u => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
