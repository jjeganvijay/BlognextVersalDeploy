'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './admin-dashboard.css'
export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (!auth) {
      router.push('/adminlogin');
    }
  }, []);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      const updated = blogs.filter(b => b.id !== id);
      localStorage.setItem('blogs', JSON.stringify(updated));
      setBlogs(updated);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>🛠️ Admin Dashboard</h1>
      <Link href="/admin/create">
        <button className="create-button">+ Create New Blog</button>
      </Link>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="blog-list">
          {blogs.map(blog => (
            <li className="blog-card" key={blog.id}>
              <h2>{blog.title}</h2>
              <p><strong>By:</strong> {blog.author}</p>
              <p><strong>Date:</strong> {blog.date}</p>
              <div className="admin-actions">
                <Link href={`/admin/edit/${blog.id}`}>
                  <button className="edit-button">✏️ Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(blog.id)}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
