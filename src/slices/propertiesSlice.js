import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:4001';

export const fetchAllProperties = createAsyncThunk(
  'properties/fetchAllProperties',
  async () => {
    console.log('running on client');
    const res = await fetch("http://localhost:3000/api/properties");
    const properties = await res.json();
    console.log('SLICE: Fetched properties:', properties);
    return properties;
  }
);

export const createProperty = createAsyncThunk(
  'properties/createProperty',
  async ({ eventId, userId, count, totalRs }) => {
    const booking = {
      eventId,
      userId,
      count,
      totalRs,
      date: new Date().toISOString().split('T')[0]
    };

    const bookingRes = await fetch(`${API}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
    const newBooking = await bookingRes.json();

    // Update seat availability
    const seatRes = await fetch(`${API}/seats?eventId=${eventId}`);
    const seatData = await seatRes.json();
    const seatId = seatData[0].id;
    const available = seatData[0].available - count;

    await fetch(`${API}/seats/${seatId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available })
    });

    return newBooking;
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default propertySlice.reducer;