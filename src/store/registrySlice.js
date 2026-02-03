import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/registry';

export const fetchRegistry = createAsyncThunk(
    'registry/fetchRegistry',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const fetchRegistryItem = createAsyncThunk(
    'registry/fetchRegistryItem',
    async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
);

export const createRegistryItem = createAsyncThunk(
    'registry/createRegistryItem',
    async (itemData) => {
        const response = await axios.post(API_URL, itemData);
        return response.data;
    }
);

export const updateRegistryItem = createAsyncThunk(
    'registry/updateRegistryItem',
    async ({ id, itemData }) => {
        const response = await axios.put(`${API_URL}/${id}`, itemData);
        return response.data;
    }
);

export const deleteRegistryItem = createAsyncThunk(
    'registry/deleteRegistryItem',
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

const initialState = {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
};

const registrySlice = createSlice({
    name: 'registry',
    initialState,
    reducers: {
        clearCurrentItem: (state) => {
            state.currentItem = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegistry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegistry.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchRegistry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(fetchRegistryItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegistryItem.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItem = action.payload;
            })
            .addCase(fetchRegistryItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(createRegistryItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRegistryItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createRegistryItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateRegistryItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRegistryItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.currentItem = action.payload;
            })
            .addCase(updateRegistryItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete item
            .addCase(deleteRegistryItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRegistryItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteRegistryItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearCurrentItem, clearError } = registrySlice.actions;
export default registrySlice.reducer;
