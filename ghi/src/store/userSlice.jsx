import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    user: null,
    error: null,
}

export const fetchByToken = createAsyncThunk(
    'user/fetchByToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8000/token`, {
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Unable to fetch token data')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchByToken.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchByToken.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.account
            })
            .addCase(fetchByToken.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export default userSlice.reducer
