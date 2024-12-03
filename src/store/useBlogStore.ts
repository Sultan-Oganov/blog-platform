import { create } from "zustand";
import { BlogPost } from "@/types/post";

export interface BlogState {
  originalPosts: BlogPost[];
  filteredPosts: BlogPost[];
  loading: boolean;
  currentPage: number;
  setOriginalPosts: (posts: BlogPost[]) => void;
  setFilteredPosts: (posts: BlogPost[]) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (page: number) => void;
  addPosts: (newPosts: BlogPost[]) => void;
}

const useBlogStore = create<BlogState>((set) => ({
  originalPosts: [],
  filteredPosts: [],
  loading: false,
  currentPage: 1,
  setOriginalPosts: (posts) => set({ originalPosts: posts, filteredPosts: posts }),
  setFilteredPosts: (posts) => set({ filteredPosts: posts }),
  setLoading: (loading) => set({ loading }),
  setCurrentPage: (page) => set({ currentPage: page }),
  addPosts: (newPosts) =>
    set((state) => ({
      originalPosts: [...state.originalPosts, ...newPosts],
      filteredPosts: [...state.filteredPosts, ...newPosts],
    })),
}));

export default useBlogStore;
