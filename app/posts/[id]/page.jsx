"use client";
// import React, { useState, useEffect } from "react";
// import styles from "./singlePage.module.css";
// import Image from "next/image";
// import Comments from "@/components/comments/Comments";

// const SinglePage = ({ params }) => {
//   // Unwrap the params using React.use()
//   const unwrappedParams = React.use(params);
//   const { id } = unwrappedParams;
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:8000/api/posts/${id}`); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error("Failed to fetch post");
//         }
//         const postData = await response.json();
//         console.log(postData);
//         setData(postData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   if (!data) {
//     return <div className={styles.error}>Post not found</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.infoContainer}>
//         <div className={styles.textContainer}>
//           <h1 className={styles.title}>{data.title}</h1>
//           <div className={styles.user}>
//             <div className={styles.userImageContainer}>
//               <Image
//                 src={data.user_image || "/technology-img.jpg"}
//                 alt="User Avatar"
//                 fill
//                 className={styles.avatar}
//               />
//             </div>

//             <div className={styles.userTextContainer}>
//               <span className={styles.username}>{data.user_name}</span>
//               <span className={styles.date}>
//                 {new Date(data.created_at).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         </div>
//         {data.img && (
//           <div className={styles.imageContainer}>
//             <Image
//               src={data.img || "/food-img.jpg"}
//               alt="Post Image"
//               fill
//               className={styles.image}
//             />
//           </div>
//         )}
//       </div>

//       <div className={styles.content}>
//         <div className={styles.post}>
//           <div className={styles.description}>
//             <p>{data.description}</p>
//           </div>
//           <div>
//             <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 w-38">
//               GENERATE SUMMARY
//             </button>
//           </div>
//           <div className={styles.comment}>
//             <Comments blogId={data.id} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePage;

import React, { useState, useEffect } from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const SinglePage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const postData = await response.json();
        console.log(postData);
        setData(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const generateSummary = async () => {
    if (!data || !data.description) return;
    try {
      setSummaryLoading(true);
      const response = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: data.description }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const result = await response.json();
      setSummary(result.summary);
    } catch (err) {
      console.error(err.message);
    } finally {
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return <div className={styles.error}>Post not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src={data.user_image || "/technology-img.jpg"}
                alt="User Avatar"
                fill
                className={styles.avatar}
              />
            </div>

            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data.user_name}</span>
              <span className={styles.date}>
                {new Date(data.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {data.img && (
          <div className={styles.imageContainer}>
            <Image
              src={data.img || "/food-img.jpg"}
              alt="Post Image"
              fill
              className={styles.image}
            />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>{data.description}</p>
          </div>
          <div>
            <button
              onClick={generateSummary}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 w-38"
              disabled={summaryLoading}
            >
              {summaryLoading ? "Generating..." : "GENERATE SUMMARY"}
            </button>
          </div>
          {summary && (
            <div className={styles.summary}>
              <h3>Summary:</h3>
              <p>{summary}</p>
            </div>
          )}
          <div className={styles.comment}>
            <Comments blogId={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
