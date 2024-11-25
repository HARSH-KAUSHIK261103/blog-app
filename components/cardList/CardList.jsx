"use client";
import React, { useState, useEffect } from "react";
import styles from "./cardList.module.css";
import axios from "axios";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const API_URL = "http://localhost:8000/api/blogs";

const CardList = ({ page, cat }) => {
  console.log(cat);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const url = cat ? `${API_URL}?category=${cat}` : API_URL;

        const response = await axios.get(url);
        setPosts(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [cat]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts.length > 0 ? (
          posts.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default CardList;
