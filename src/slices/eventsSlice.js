import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:4001';

export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (search) => {
    const res = await fetch(`${API}/events`);
    const events = await res.json();
    if (search) {
      const searchLower = search.toLowerCase();
      return events.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      return events.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      return events.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }
    return events;
  }
);

export const fetchFeatured = createAsyncThunk(
  'events/fetchFeatured',
  async (search) => {
    const featured = await fetch(`${API}/featured-events`).then(r => r.json());
    const events = await Promise.all(
      featured.map(f => fetch(`${API}/events/${f.eventId}`).then(r => r.json()))
    );
    return filterEvents(events, search);
  }
);

export const fetchUpcoming = createAsyncThunk(
  'events/fetchUpcoming',
  async (search) => {
    const upcoming = await fetch(`${API}/upcoming-events`).then(r => r.json());
    const events = await Promise.all(
      upcoming.map(u => fetch(`${API}/events/${u.eventId}`).then(r => r.json()))
    );
    return filterEvents(events, search);
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    all: [],
    featured: [],
    upcoming: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      });
  },
});

export default eventsSlice.reducer;
