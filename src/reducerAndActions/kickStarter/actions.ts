import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Project } from './reducer';
import { AxiosError } from 'axios';
import axios from '../../api/api';

export const fetchProjectDetails = createAsyncThunk<Project[]>(
    'kickStarterProjectSlice/fetchProjectDetails', async () => {
        try {
            const response = await axios.get('/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
            return response.data;

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw (
                    error.response?.data
                );
            }
            throw error;
        }
    }
)