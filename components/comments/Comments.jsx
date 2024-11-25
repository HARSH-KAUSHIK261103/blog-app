"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

// Dummy comments data (with multiple comments for a single blog)
const dummyComments = [
  {
    _id: "1",
    desc: "This is a great post! Thanks for sharing.",
    blogId: 1, // Refers to the blog with id: 1
    createdAt: "2024-11-22",
    user: {
      name: "John Doe",
      image: "",
    },
  },
  {
    _id: "2",
    desc: "Really insightful, I learned a lot.",
    blogId: 2, // Refers to the blog with id: 2
    createdAt: "2024-11-21",
    user: {
      name: "aaaaaaaa",
      image: "",
    },
  },
  {
    _id: "3",
    desc: "Looking forward to more posts like this!",
    blogId: 3, // Refers to the blog with id: 3
    createdAt: "2024-11-20",
    user: {
      name: "Alice Johnson",
      image: "/p1.jpeg",
    },
  },
  {
    _id: "4",
    desc: "Great introduction to Next.js!",
    blogId: 1, // Refers to the blog with id: 1
    createdAt: "2024-11-23",
    user: {
      name: "Eve Adams",
      image: "/p1.jpeg",
    },
  },
  {
    _id: "5",
    desc: "Next.js makes React apps so much easier.",
    blogId: 1, // Refers to the blog with id: 1
    createdAt: "2024-11-22",
    user: {
      name: "Charlie Brown",
      image: "/p1.jpeg",
    },
  },
];

const Comments = ({ blogId }) => {
  const { status } = useSession();
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");

  // Filter comments by blogId
  useEffect(() => {
    const filteredComments = dummyComments.filter(
      (comment) => comment.blogId === blogId
    );
    setComments(filteredComments);
  }, [blogId]);

  const handleSubmit = () => {
    const newComment = {
      _id: Math.random().toString(36).substring(7),
      desc,
      blogId,
      createdAt: new Date().toISOString().split("T")[0],
      user: {
        name: "Authenticated User", // Replace with session user's name
        image: "/p1.jpeg", // Replace with session user's avatar
      },
    };
    setComments((prevComments) => [newComment, ...prevComments]);
    setDesc("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {comments.length === 0
          ? "No comments yet"
          : comments.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt="User Avatar"
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>{item.createdAt}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
