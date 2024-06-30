import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from '../style/Upload.module.css';

const Upload = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('stuId', user.id);
    images.forEach((image, index) => {
      data.append(`images`, image);
    });

    axios.post('http://localhost:8080/gbsw/shop/create', data)
      .then(response => {
        console.log('Item uploaded:', response.data);
      })
      .catch(error => console.error('Failed to upload item:', error));
  };

  return (
    <div className={styles.uploadPage}>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <label>
          상품 이름:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          가격:
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <label>
          카테고리:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          설명:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          이미지 업로드 (최대 5장):
          <input type="file" name="images" multiple onChange={handleImageChange} />
        </label>
        <div className={styles.imagePreviews}>
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`preview ${index}`} className={styles.imagePreview} />
          ))}
        </div>
        <button type="submit">업로드</button>
      </form>
    </div>
  );
};

export default Upload;
