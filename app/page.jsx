"use client";
import "./globals.css";
import { useSearchParams } from "next/navigation";
import CardList from "@/components/cardList/CardList";
import styles from "../app/blog/blogPage.module.css";
import Menu from "@/components/Menu/Menu";
import MenuCategories from "@/components/menuCategories/MenuCategories";

const BlogPage = () => {
  const searchParams = useSearchParams(); // Get searchParams from useSearchParams hook
  const page = parseInt(searchParams.get("page")) || 1; // Get the 'page' parameter, default to 1
  const cat = searchParams.get("cat"); // G

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      <MenuCategories />
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
