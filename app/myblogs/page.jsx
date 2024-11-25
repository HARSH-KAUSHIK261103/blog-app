"use client";
import React, { useState, useEffect } from "react";
import styles from "./MyBlogs.module.css";
import axios from "axios";
import DeleteCard from "../../components/deletepost/Delete";
import { useSession } from "next-auth/react"; // Imort useSession to get session

// You can adjust the API endpoint as needed
const API_URL = "http://localhost:8000/api/blogs"; // Adjust the URL if necessary

const MyBlogs = ({ page, cat }) => {
  // State to store posts and loading state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current session using useSession
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (status === "loading") return;
      try {
        setLoading(true);
        const response = await axios.get(API_URL);

        const filteredPosts = response.data.filter(
          (blog) => blog.user_email === session?.user?.email
        );

        setPosts(filteredPosts);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [session, status]); // Re-run effect when session or status changes

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
          posts.map((item) => (
            <DeleteCard item={item} key={item.id} /> // Use the id from the fetched data
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
