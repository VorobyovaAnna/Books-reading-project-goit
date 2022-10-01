import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import openNotificationWithIcon from 'components/Notification';
axios.defaults.baseURL = 'https://nodejs-final-project-goit.herokuapp.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', credentials);
      token.set(data.data.token);
      return data.data;
    } catch (error) {
      rejectWithValue(error);
      openNotificationWithIcon('warning', error.response.data.message);
    }
  }
);
const registerGoogle = createAsyncThunk(
  'auth/google/register',
  async (data, { rejectWithValue }) => {
    try {
      token.set(data.data.token);
      return data.data;
    } catch (error) {
      rejectWithValue(error);
      openNotificationWithIcon('error', error.response.data.message);
    }
  }
);

const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      token.set(data.data.token);
      return data.data;
    } catch (error) {
      rejectWithValue(error);
      openNotificationWithIcon('error', error.response.data.message);
    }
  }
);
const logInGoogle = createAsyncThunk(
  'auth/google/login',
  async (data, { rejectWithValue }) => {
    try {
      token.set(data.data.token);
      return data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/logout');
      token.unset();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/auth/current');
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const operations = {
  register,
  registerGoogle,
  logOut,
  logIn,
  logInGoogle,
  fetchCurrentUser,
};
export default operations;
