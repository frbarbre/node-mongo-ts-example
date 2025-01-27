import { Request, Response } from "express";
import { Post } from "../models/User.js";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("userId");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate("userId");
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.log("Error creating post", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    post.title = title;
    post.content = content;
    post.userId = user_id;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    await post.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
