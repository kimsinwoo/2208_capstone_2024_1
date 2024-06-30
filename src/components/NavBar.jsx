import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
import styles from '../style/NavBar.module.css';

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/main">Main</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/chat">Chat</Link>
      {isAuthenticated ? (
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
