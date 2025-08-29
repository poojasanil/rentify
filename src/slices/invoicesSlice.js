import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:4001';

export const fetchInvoices = createAsyncThunk(
  'invoices/fetch',
  async (userId) => {
    const url = userId
      ? `${API}/invoices?userId=${userId}`
      : `${API}/invoices`;
    const res = await fetch(url);
    return res.json();
  }
);

export const createInvoice = createAsyncThunk(
  'invoices/create',
  async (invoice) => {
    const res = await fetch(`${API}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    });
    return res.json();
  }
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default invoicesSlice.reducer;
