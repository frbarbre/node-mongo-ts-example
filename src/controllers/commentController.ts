import { Request, Response } from "express";
import { Comment } from "../models/User.js";

export const getComments = async (req: Request, res: Response) => {
  console.log("getComments");
  try {
    const comments = await Comment.find().populate("userId");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find().populate("userId");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("userId");
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.body.userId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content, postId } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    comment.content = content;
    comment.postId = postId;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    await comment.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId }).populate("userId");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
