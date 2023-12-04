import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://192.168.208.61:5000/process_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      setResponseText(response.data.text);
    } catch (error) {
        setLoading(false);
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
        <Nav/>
        <div className="login-container">
          <label>Upload x-ray image for pneumonia prediction</label><br/><br/>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>Upload and Process Image</button>
      {loading && <p>Processing...</p>}
      {responseText && <p>{responseText}</p>}
    </div></div>
  );
};

export default ImageUploader;
