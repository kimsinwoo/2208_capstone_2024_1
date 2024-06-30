import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style/MainPage.module.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/gbsw/shop')
      .then(response => setItems(response.data))
      .catch(error => console.error('Failed to fetch items:', error));
  }, []);

  return (
    <div className={styles.mainPage}>
      {items.map(item => (
        <Link to={`/detail/${item.id}`} key={item.id} className={styles.item}>
          <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image})` }}></div>
          <div className={styles.itemInfo}>
            <h2>{item.title}</h2>
            <p>{item.price}원</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainPage;
