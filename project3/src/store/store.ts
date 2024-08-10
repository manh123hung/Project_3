import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices'; // This should point to your root reducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
