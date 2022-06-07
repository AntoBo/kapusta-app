import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchLoginUser,
  fetchLogoutUser,
  fetchRefreshUser,
  fetchRegisterUser,
} from '../../utils/backendApi';
import { errorHandler } from '../error/errorHandler';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUser, thunkApi) => {
    try {
      return await fetchRegisterUser(newUser);
      // const regResp = await fetchRegisterUser(newUser);
      // dispatch(loginUser(newUser));
      // return regResp;
    } catch (error) {
      return thunkApi.rejectWithValue(error.request.status);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkApi) => {
    try {
      return await fetchLoginUser(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error.request.status);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkApi) => {
    try {
      return await fetchLogoutUser();
    } catch (error) {
      setTimeout(() => {
        thunkApi.dispatch(
          errorHandler({
            error,
            cb: logoutUser,
          })
        );
      }, 0);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    const sid = thunkApi.getState().auth.sid;
    const token = thunkApi.getState().auth.token;
    const refreshToken = thunkApi.getState().auth.refreshToken;
    try {
      if (token) {
        return await fetchRefreshUser(sid, refreshToken);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const loginGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async ({ accessToken, refreshToken, sid }, thunkApi) => {
    try {
      return { accessToken, refreshToken, sid };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
