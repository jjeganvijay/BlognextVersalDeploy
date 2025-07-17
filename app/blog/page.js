'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog-list.module.css';

export default function BlogList() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user-auth');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      router.replace('/login');
      return;
    }

    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📝 All Blogs</h1>
      {blogs.length === 0 ? (
        <p className={styles.noBlogs}>No blogs found. Create your first one!</p>
      ) : (
        <div className={styles.blogGrid}>
          {blogs.map((blog) => (
            <div className={styles.blogCard} key={blog.id}>
              {blog.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className={styles.cardContent}>
                <Link href={`/blog/${blog.id}`} className={styles.blogTitle}>
                  {blog.title}
                </Link>
                <p className={styles.blogMeta}>
                  By {blog.author} on {blog.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
