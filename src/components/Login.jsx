import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import styles from '../style/Login.module.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ stuId: '', stuPwd: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label>
          아이디:
          <input type="text" name="stuId" value={credentials.stuId} onChange={handleChange} />
        </label>
        <label>
          비밀번호:
          <input type="password" name="stuPwd" value={credentials.stuPwd} onChange={handleChange} />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
