import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import eventsReducer from '../slices/eventsSlice';
import seatsReducer from '../slices/seatsSlice';
import invoicesReducer from '../slices/invoicesSlice';
import usersReducer from '../slices/usersSlice';
import propertiesReducer from '../slices/propertiesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    seats: seatsReducer,
    invoices: invoicesReducer,
    users: usersReducer,
    properties: propertiesReducer
  },
})