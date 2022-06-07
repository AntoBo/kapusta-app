import axios from 'axios';

axios.defaults.baseURL = 'https://kapusta-backend.goit.global/';

const setToken = token => {
  axios.defaults.headers.common['Authorization'] = token;
};

//user
//{
//   email: 'user9999@mail.com',
//   password: 'user9999',
// };

//AUTH
export const fetchRegisterUser = async newUserObject => {
  //eslint-disable-next-line
  const registerResp = await axios.post('/auth/register', newUserObject);
  const loginResp = await fetchLoginUser(newUserObject);
  return loginResp;
};

export const fetchLoginUser = async userDataObject => {
  const resp = await axios.post('/auth/login', userDataObject);
  setToken('Bearer ' + resp.data.accessToken);

  return resp.data;
};

export const fetchLogoutUser = async () => {
  const resp = await axios.post('/auth/logout');
  return resp.data;
};

export const fetchRefreshUser = async (sid, refreshToken) => {
  setToken('Bearer ' + refreshToken);
  const data = await axios.post('/auth/refresh', { sid }).then(({ data }) => {
    setToken('Bearer ' + data.newAccessToken);
    return data;
  });
  return data;
};

// export const fetchLoginGoogle  - still in process

//TRANSACTIONS
export const fetchSetBalance = async newBalance => {
  //manually set user balance after register
  const resp = await axios.patch('/user/balance', { newBalance });
  return resp.data;
};
export const fetchIncomeTransaction = async transactionObject => {
  const resp = await axios.post('/transaction/income', transactionObject);
  return resp.data;
};

export const fetchExpenseTransaction = async transactionObject => {
  const resp = await axios.post('/transaction/expense', transactionObject);
  return resp.data;
};
export const fetchDeleteTransaction = async id => {
  const resp = await axios.delete('/transaction/' + id);
  return resp.data;
};

//TRANSACTION STATS
export const fetchAllUserInfo = async token => {
  if (token) setToken('Bearer ' + token);
  const resp = await axios.get('/user');

  return resp.data;
};
export const fetchIncomeStats = async () => {
  const resp = await axios.get('/transaction/income');
  return resp.data;
};
export const fetchExpenseStats = async () => {
  const resp = await axios.get('/transaction/expense');
  return resp.data;
};
export const fetchIncomeCats = async () => {
  const resp = await axios.get('/transaction/income-categories');
  return resp.data;
};
export const fetchExpenseCats = async () => {
  const resp = await axios.get('/transaction/expense-categories');
  return resp.data;
};

export const fetchTransactionsPerPeriod = async period => {
  const resp = await axios.get('/transaction/period-data?date=' + period);
  return resp.data;
};
