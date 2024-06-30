import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../style/Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/gbsw/shop/Category/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error('Failed to fetch item:', error));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className={styles.detailPage}>
      <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image})` }}></div>
      <div className={styles.itemInfo}>
        <h2>{item.title}</h2>
        <p>{item.price}원</p>
        <p>{item.description}</p>
        <Link to={`/chat?roomId=${item.title}&name=사용자명`} className={styles.chatButton}>채팅하기</Link>
      </div>
    </div>
  );
};

export default Detail;
