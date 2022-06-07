import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  loginGoogle,
} from './authOperations';
import {
  allUserInfo,
  deleteTransaction,
  expenseTransaction,
  incomeTransaction,
  setBalance,
} from '../transactions/transactionsOperations';

const initialState = {
  user: {
    email: '',
    balance: 0,
    id: '',
    transactions: [],
  },
  sid: '',
  token: '',
  refreshToken: '',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    //register
    [registerUser.fulfilled]: (state, { payload }) => ({
      ...state,
      user: { ...payload.userData },
      token: payload.accessToken,
      refreshToken: payload.refreshToken,
      sid: payload.sid,
      loading: false,
      error: null,
    }),
    [loginUser.fulfilled]: (state, { payload }) => ({
      ...state,
      user: { ...payload.userData },
      token: payload.accessToken,
      refreshToken: payload.refreshToken,
      sid: payload.sid,
      loading: false,
      error: null,
    }),
    [loginGoogle.fulfilled]: (state, { payload }) => {
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
    },
    //logout
    [logoutUser.fulfilled]: () => ({
      ...initialState,
    }),
    [logoutUser]: () => ({
      ...initialState,
    }),
    //refresh
    [refreshUser.fulfilled]: (state, { payload }) => ({
      ...state,
      token: payload.newAccessToken,
      refreshToken: payload.newRefreshToken,
      sid: payload.newSid,
      loading: false,
      error: null,
    }),
    //pendings/rejects
    [registerUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [loginUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [logoutUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [refreshUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [refreshUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [setBalance.fulfilled](state, { payload }) {
      state.user.balance = payload.newBalance;
    },
    [deleteTransaction.fulfilled](state, { payload }) {
      state.user.balance = payload.data.newBalance;
      state.user.transactions = state.user.transactions.filter(
        el => el._id !== payload.id
      );
    },
    [incomeTransaction.fulfilled](state, { payload }) {
      state.user.balance = payload.newBalance;
    },
    [expenseTransaction.fulfilled](state, { payload }) {
      state.user.balance = payload.newBalance;
    },
    [allUserInfo.fulfilled](state, action) {
      state.loading = false;
      state.user.email = action.payload.email;
      state.user.balance = action.payload.balance;
      state.user.transactions = action.payload.transactions;
      state.user.id = action.payload.id;
    },
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
