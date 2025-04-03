import React, { useState, useEffect } from "react";

export default function GetPosts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", user_Id: "" });

  // Function to fetch posts from the API
  const getPosts = async () => {
    try {
      const response = await fetch("https://localhost:7046/api/Post", { method: "GET" });
      const postsData = await response.json();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Function to add a new post using the API
  const addPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7145/api/Post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      });
      if (response.ok) {
        alert("New post added successfully");
        // Refresh the posts list
        getPosts();
        // Clear the form fields
        setNewPost({ title: "", content: "", user_Id: "" });
      } else {
        alert("Problem in saving post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7046/api/Post/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Post deleted successfully");
   
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Post not deleted");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="card p-4">
      <h2 className="text-center">Posts</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{post.title}</strong> - {post.content}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3 className="mt-4">Add a Post</h3>
      <form onSubmit={addPost}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="User ID"
            value={newPost.user_Id}
            onChange={(e) => setNewPost({ ...newPost, user_Id: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>
    </div>
  );
}
