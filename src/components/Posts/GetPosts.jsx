
import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    post {
      id
      title
      content
    }
  }
`;

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!, $user_Id: Int!) {
    insert_post(objects: { title: $title, content: $content, user_Id: $user_Id }) {
      returning {
        id
        title
        content
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    delete_post_by_pk(id: $id) {
      id
    }
  }
`;

export default function GetPosts() {
  const [newPost, setNewPost] = useState({ title: "", content: "", user_Id: "" });
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  const [addPostMutation] = useMutation(ADD_POST);
  const [deletePostMutation] = useMutation(DELETE_POST);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  const addPost = async (e) => {
    e.preventDefault();
    try {
      await addPostMutation({
        variables: {
          title: newPost.title,
          content: newPost.content,
          user_Id: parseInt(newPost.user_Id, 10)
        }
      });
      alert("New post added successfully");
      refetch();
      setNewPost({ title: "", content: "", user_Id: "" });
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Problem in saving post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePostMutation({
        variables: { id }
      });
      alert("Post deleted successfully");
      refetch();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Post not deleted");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="text-center">Posts</h2>
      <ul className="list-group">
        {data.post.map((post) => (
          <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>ID: {post.id}</strong>
            <br />
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
