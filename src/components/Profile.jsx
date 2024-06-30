import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from '../style/Profile.module.css';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/gbsw/shop/user/${user.id}`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Failed to fetch user items:', error));
  }, [user]);

  return (
    <div className={styles.profilePage}>
      <h1>{user.name}'s Profile</h1>
      <div className={styles.userItems}>
        {items.map(item => (
          <div key={item.id} className={styles.userItem}>
            <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className={styles.itemInfo}>
              <h2>{item.title}</h2>
              <p>{item.price}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
