import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
import BlockContent from "@sanity/block-content-to-react"; // To render rich text
// import "./BlogPage.css"; // Import external styles

export default function BlogPage() {
  const { slug } = useParams(); // Get the blog slug from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch individual blog post by slug
    const fetchBlog = async () => {
      const query = `*[_type == 'blog' && slug.current == $slug][0]`;
      const data = await client.fetch(query, { slug });
      setBlog(data);
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <div className="blogPage-loading">Loading...</div>;

  return (
    <div className="blogPage-container">
      {/* Blog Title */}
      <h1 className="blogPage-title">{blog.title}</h1>

      {/* Blog Title Image */}
      {blog.titleImage && (
        <img
          className="blogPage-image"
          src={urlFor(blog.titleImage).url()}
          alt={blog.title}
        />
      )}

      {/* Blog Description */}
      <p className="blogPage-description">{blog.smallDescription}</p>

      {/* Blog Content */}
      <div className="blogPage-content">
        {blog.content?.map((block, index) => {
          if (block._type === "block") {
            // Render rich text content
            return (
              <div className="blogPage-block-content" key={index}>
                <BlockContent blocks={block} />
              </div>
            );
          }

          if (block._type === "image") {
            // Render images in the content
            return (
              <img
                key={index}
                className="blogPage-content-image"
                src={urlFor(block).url()}
                alt={block.alt || "Image"}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
