"use client";

import { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import useBlogStore from "@/store/useBlogStore";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { BlogPost } from "@/types/post";
import Image from "next/image";

export default function Home() {
  const {
    filteredPosts,
    setOriginalPosts,
    setLoading,
    loading,
    currentPage,
    setCurrentPage,
    addPosts,
  } = useBlogStore();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<BlogPost[]>(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
        );
        const postsWithImages = response.data.map((post) => ({
          ...post,
          imageUrl: `https://unsplash.it/200/200?random=${post.id}`,
        }));
        setOriginalPosts(postsWithImages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setOriginalPosts, setLoading]);

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get<BlogPost[]>(
        `https://jsonplaceholder.typicode.com/posts?_page=${nextPage}&_limit=10`
      );
      const postsWithImages = response.data.map((post) => ({
        ...post,
        imageUrl: `https://unsplash.it/200/200?random=${post.id}`,
      }));
      addPosts(postsWithImages);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, currentPage, setLoading, addPosts, setCurrentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Recent Blog Posts</h1>
        <ThemeToggle />
      </div>
      <SearchBar />
      <ul className="space-y-4" aria-label="Blog Posts">
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className="p-4 border rounded-lg shadow-sm flex items-center gap-4"
            role="article"
          >
            <Image
              src={post.imageUrl}
              alt={`Thumbnail for ${post.title}`}
              width={80}
              height={80}
              className="rounded"
            />
            <div>
              <Link
                href={`/blog/${post.id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
                aria-label={`Read more about ${post.title}`}
              >
                {post.title}
              </Link>
              <p>{post.body.slice(0, 100)}...</p>
            </div>
          </li>
        ))}
      </ul>
      <div
        ref={observerRef}
        className="h-10 mt-4 flex justify-center items-center"
      >
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
