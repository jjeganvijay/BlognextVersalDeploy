'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './/edit-blog.css';

export default function EditBlog({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (!auth) router.push('/adminlogin');

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogToEdit = blogs.find(b => b.id === params.id);

    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
    } else {
      alert('Blog not found');
      router.push('/admin/dashboard');
    }
  }, [params.id, router]);

  const handleUpdate = () => {
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    const updatedBlog = {
      id: params.id,
      title,
      content,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0]
    };

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const updatedBlogs = blogs.map(b => (b.id === params.id ? updatedBlog : b));
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    router.push('/admin/dashboard');
  };

  return (
     <div className="edit-blog-container">
    <h1>🛠️ Edit Blog</h1>
    <input
      className="edit-blog-input"
      type="text"
      placeholder="Blog title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <textarea
      className="edit-blog-textarea"
      placeholder="Blog content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={10}
    />
    <button className="update-button" onClick={handleUpdate}>Update</button>
  </div>
  );
}
