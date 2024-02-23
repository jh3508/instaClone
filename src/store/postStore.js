import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) =>
    set((state) => {
      return { posts: [post, ...state.posts] };
    }),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id != id),
    })),
  setPosts: (posts) => set({ posts }),
  addComment: (postId, newComment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        } else {
          return post;
        }
      }),
    })),
}));

export default usePostStore;
