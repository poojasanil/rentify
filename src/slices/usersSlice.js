import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:4001';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const res = await fetch(`${API}/users`);
    return res.json();
  }
);

export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ id, role }) => {
    const res = await fetch(`${API}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    return res.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const idx = state.list.findIndex(u => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export default usersSlice.reducer;
