"use client";
import { useState, useMemo } from "react";
import { debounce } from "lodash";
import useBlogStore from "@/store/useBlogStore";

export default function SearchBar() {
  const { originalPosts, setFilteredPosts } = useBlogStore();
  const [query, setQuery] = useState<string>("");

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (!value) {
          setFilteredPosts(originalPosts);
          return;
        }

        const filtered = originalPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(value.toLowerCase()) ||
            post.body.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPosts(filtered);
      }, 300),
    [originalPosts, setFilteredPosts]
  );

  useMemo(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={query}
      onChange={onChange}
      className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-800"
    />
  );
}
