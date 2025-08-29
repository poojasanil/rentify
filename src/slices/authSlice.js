import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials) => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Signup failed');
    }
    const data = await res.json();
    return data.user;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email }, thunkAPI) => {
    await new Promise(res => setTimeout(res, 500));
    return { id: 2, email, role: 'user' };
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, state => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
