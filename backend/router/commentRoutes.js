import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

// Post a comment
router.post("/", addComment);

// Get comments for a specific post
router.get("/:postId", getComments);

export default router;
