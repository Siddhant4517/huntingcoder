"use client"; // Necessary for client-side rendering in Next.js

import React, { useState, useEffect } from "react";
import styles from "../../styles/blog.module.css";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

async function fetchBlogs(offset = 0, limit = 5) {
  const response = await fetch(
    `https://your-backend-api.vercel.app/api/allblogs?offset=${offset}&limit=${limit}`,
    {
      cache: "no-store",
      mode: "no-cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.allBlogs;
}

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 5; // Number of blogs to load per request

  useEffect(() => {
    const loadInitialBlogs = async () => {
      try {
        const initialBlogs = await fetchBlogs(offset, limit);
        setBlogs(initialBlogs);
        setOffset(offset + limit);
        if (initialBlogs.length < limit) {
          setHasMore(false); // No more blogs to load
        }
      } catch (error) {
        console.error("Error fetching initial blogs:", error);
      }
    };

    loadInitialBlogs();
  }, []);

  const fetchMoreBlogs = async () => {
    try {
      const newBlogs = await fetchBlogs(offset, limit);
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setOffset(offset + limit);
      if (newBlogs.length < limit) {
        setHasMore(false); // No more blogs to load
      }
    } catch (error) {
      console.error("Error fetching more blogs:", error);
    }
  };

  return (
    <main className={styles.main}>
      <InfiniteScroll
        dataLength={blogs.length} // This is important to render the next data
        next={fetchMoreBlogs}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={styles.grid}>
          {blogs.map((blogitem) => (
            <div key={blogitem.slug}>
              <Link href={`/blog/${blogitem.slug}`} className={styles.card}>
                <h2>
                  {blogitem.title} <span>-&gt;</span>
                </h2>
                <p>{blogitem.metadata.substr(0, 140)}...</p>
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};

export default Blog;
