import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/registry';



export const fetchRegistry = createAsyncThunk(
    'registry/fetchRegistry',
    async () => {
        const res = await axios.get(API_URL);
        return res.data;
    }
);

export const fetchRegistryItem = createAsyncThunk(
    'registry/fetchRegistryItem',
    async (id) => {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    }
);

export const createRegistryItem = createAsyncThunk(
    'registry/createRegistryItem',
    async (itemData) => {
        const res = await axios.post(API_URL, itemData);
        return res.data;
    }
);

export const updateRegistryItem = createAsyncThunk(
    'registry/updateRegistryItem',
    async ({ id, itemData }) => {
        const res = await axios.put(`${API_URL}/${id}`, itemData);
        return res.data;
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


const handleAsync = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
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


        handleAsync(builder, fetchRegistry);
        builder.addCase(fetchRegistry.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });


        handleAsync(builder, fetchRegistryItem);
        builder.addCase(fetchRegistryItem.fulfilled, (state, action) => {
            state.loading = false;
            state.currentItem = action.payload;
        });


        handleAsync(builder, createRegistryItem);
        builder.addCase(createRegistryItem.fulfilled, (state, action) => {
            state.loading = false;
            state.items.push(action.payload);
        });


        handleAsync(builder, updateRegistryItem);
        builder.addCase(updateRegistryItem.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(
                item => item.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
            state.currentItem = action.payload;
        });

        handleAsync(builder, deleteRegistryItem);
        builder.addCase(deleteRegistryItem.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        });
    },
});

export const { clearCurrentItem, clearError } = registrySlice.actions;
export default registrySlice.reducer;
