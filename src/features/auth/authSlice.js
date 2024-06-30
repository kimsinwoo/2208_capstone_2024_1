import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // 이름 내보내기로 수정
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload); // jwtDecode로 변경
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/gbsw/students/signIn', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(token));
  } catch (error) {
    console.error('Failed to login:', error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export default authSlice.reducer;