'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './blogDetail.css'; 

export default function BlogDetails({ params }) {
  const [blog, setBlog] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('user-auth');
    if (!auth) {
      router.push('/login');
      return;
    }

    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        const found = data.find(b => b.id === params.id);
        if (found) {
          setBlog(found);
        } else {
          router.push('/not-found');
        }
      });
  }, [params.id]);

  if (!blog) return <p className="blog-detail-container">Loading blog...</p>;

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p className="blog-meta">
        <strong>By:</strong> {blog.author} | <strong>Date:</strong> {blog.date}
      </p>
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="blog-image" />
      )}
      <p className="blog-content">{blog.content}</p>
    </div>
  );
}
