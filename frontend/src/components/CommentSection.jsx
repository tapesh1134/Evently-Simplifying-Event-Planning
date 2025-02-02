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
      if (comment?.postId === eventId) {
        dispatch(addComment(comment));
      }
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
      username: user?.userName || "Anonymous",
      postId: eventId,
      role: user?.role || "User",
    };

    try {
      dispatch(postComment(commentData));
      socket.emit("sendComment", commentData);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };


  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md max-w-lg mx-auto text-left w-full">
      <h2 className="text-lg font-semibold mb-3">Comments</h2>

      {error && <p className="text-red-500 mb-3 text-xs">{error}</p>}

      <form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? "Write a comment..." : "Log in to comment"}
          className="flex-1 p-2 rounded-md bg-gray-800 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
          disabled={!user}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition duration-300 disabled:opacity-50"
          disabled={!user || loading}
        >
          {loading ? "..." : "Post"}
        </button>
      </form>

      {loading ? (
        <Spinner />
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-xs">No comments yet.</p>
      ) : (
        <div className="space-y-5">
          {comments.map((comment, index) => (
            <div key={index} className="pl-0">
              <p className="text-blue-400 font-semibold text-[11px] mb-1">{comment.username}</p>
              <div
                className="p-3 rounded-lg bg-gray-800 text-xs w-full"
                style={{
                  border: comment.text.length > 40 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  maxWidth: "90%",
                }}
              >
                <p className="text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
