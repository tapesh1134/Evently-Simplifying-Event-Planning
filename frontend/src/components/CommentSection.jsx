import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, postComment, addComment } from "../store/slices/commentSlice";
import socket from "../socket";
import Spinner from "./Spinner";

const CommentSection = ({ eventId, user }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(fetchComments(eventId));

    socket.on("receiveComment", (comment) => {
      dispatch(addComment(comment));
    });

    return () => {
      socket.off("receiveComment");
    };
  }, [dispatch, eventId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    const commentData = {
      text: newComment,
      username: user?.userName || "Anonymous",  // Use username from user or default to "Anonymous"
      postId: eventId,
      role: user?.role || "User", // Use user's role or default to "User"
    };
  
    try {
      // Dispatch postComment to send the comment to the backend
      await dispatch(postComment(commentData));
  
      // Emit the comment via socket (for real-time updates)
      socket.emit("sendComment", commentData);
  
      // Clear input after sending the comment
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };
  

  return (
    <div className="p-6 border-t border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Display Error Message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? "Write a comment..." : "Please log in to comment."}
          className="border p-2 w-full rounded text-black"
          disabled={!user} // Disable the input if user is not logged in
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          disabled={!user || loading} // Disable the button if user is not logged in or while loading
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* Display Comments */}
      {loading ? (
        <Spinner />
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-2">
              <strong>{comment.username}: </strong>
              {comment.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
