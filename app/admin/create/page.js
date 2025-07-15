'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [image, setImage] = useState('');


  const handleSubmit = () => {
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    const newBlog = {
  id: Date.now().toString(),
  title,
  content,
  image,
  author: 'Admin',
  date: new Date().toISOString().split('T')[0]
};


    const existing = JSON.parse(localStorage.getItem('blogs')) || [];
    const updated = [newBlog, ...existing];
    localStorage.setItem('blogs', JSON.stringify(updated));
    router.push('/admin/dashboard');
  };

  return (
      <div className="create-blog-container">
      <h1>✍️ Create New Blog</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
  type="text"
  placeholder="Image URL (optional)"
  value={image}
  onChange={(e) => setImage(e.target.value)}
  style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
/>

      <textarea
        className="form-textarea"
        placeholder="Blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
      />
      <button className="form-button" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
