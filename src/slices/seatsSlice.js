import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:4001';

export const fetchSeats = createAsyncThunk(
  'seats/fetch',
  async (eventId) => {
    const res = await fetch(`${API}/seats?eventId=${eventId}`);
    const data = await res.json();
    return { eventId, seat: data[0] || null };
  }
);

export const updateSeat = createAsyncThunk(
  'seats/update',
  async ({ id, available }) => {
    const res = await fetch(`${API}/seats/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available }),
    });
    return res.json();
  }
);

const seatsSlice = createSlice({
  name: 'seats',
  initialState: { byEvent: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSeats.fulfilled, (state, action) => {
        state.byEvent[action.payload.eventId] = action.payload.seat;
      })
      .addCase(updateSeat.fulfilled, (state, action) => {
        const seat = action.payload;
        state.byEvent[seat.eventId] = seat;
      });
  },
});

export default seatsSlice.reducer;
