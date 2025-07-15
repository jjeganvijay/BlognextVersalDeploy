'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './blog-list.css';

export default function BlogList() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only runs on client because of 'use client'
    const isLoggedIn = localStorage.getItem('user-auth');
    console.log('🔐 Is user logged in?', isLoggedIn);

    if (!isLoggedIn || isLoggedIn !== 'true') {
      console.log('⛔ Not logged in. Redirecting...');
      router.replace('/login'); // Use replace to avoid going back
      return;
    }

    const blogData = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(blogData);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div className="blog-list-container">
      <h1>📝 All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}
              />
            )}
            <h2>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </h2>
            <p>By {blog.author} on {blog.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
