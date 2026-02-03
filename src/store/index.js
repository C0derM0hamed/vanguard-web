import { configureStore } from '@reduxjs/toolkit';
import registryReducer from './registrySlice';

export const store = configureStore({
    reducer: {
        registry: registryReducer,
    },
});
