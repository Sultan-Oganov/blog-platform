import axios from "axios";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/post";

type PageProps = Promise<{ slug: string[] }>

export async function generateMetadata({
  params,
}: { params: PageProps }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await axios.get<BlogPost>(
      `https://jsonplaceholder.typicode.com/posts/${slug}`
    );
    const post = response.data;

    return {
      title: `${post.title} - Blog Post`,
      description: `Read the blog post "${post.title}" authored by user #${post.userId}.`,
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);

    return {
      title: "Blog Post Not Found",
      description: "The blog post could not be found.",
    };
  }
}

export default async function BlogPost({
  params,
}: { params: PageProps }) {
  const { slug } = await params;

  try {
    const response = await axios.get<BlogPost>(
      `https://jsonplaceholder.typicode.com/posts/${slug}`
    );
    const post = response.data;

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-600 mb-4">By Author #{post.userId}</p>
        <p>{post.body}</p>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch post:", error);

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>Failed to load the blog post. Please try again later.</p>
      </div>
    );
  }
}
