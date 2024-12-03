import axios from "axios";
import type { BlogPost } from "@/types/post";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await axios.get<BlogPost>(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = response.data;

  return {
    title: `${post.title} - Blog Post`,
    description: `Read the blog post "${post.title}" authored by user #${post.userId}.`,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await axios.get<BlogPost>(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = response.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600 mb-4">By Author #{post.userId}</p>
      <p>{post.body}</p>
    </div>
  );
}
