import {
  deletePostById,
  getPostById,
  getPosts,
  savePost,
  updatePostById,
} from "../db/post";
import express from "express";
import { generateBlogPost } from "../services/openai";

export const getPostList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { page = '1', limit = '10', search = '', category = '' } = req.query;

    // Convert page and limit to numbers and validate
    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string))); // Cap at 50 items per page

    const result = await getPosts({
      page: pageNum,
      limit: limitNum,
      search: search as string,
      category: category as string
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error getting posts:', error);
    return res.status(400).json({ error: 'Failed to fetch posts' });
  }
};

export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id);

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, content, author, category, tags, cover, view, createAt } =
      req.body;

    if (!title || !content || !author) {
      return res.sendStatus(400);
    }

    const postResponse = await savePost({
      title,
      content,
      author,
      category,
      tags,
      cover,
      view,
      createAt,
    });

    return res.status(200).json({ message: "Post save successfuly" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createAutoPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { category, topic, author, token } = req.body;

    if (!author || !token) {
      return res.status(400).json({ error: "Author and token are required" });
    }

    // Generate blog post using OpenAI
    const generatedPost = await generateBlogPost({
      category: category || "Technology",
      topic: topic
    });

    // Save the generated post
    const postResponse = await savePost({
      title: generatedPost.title,
      content: generatedPost.content,
      author,
      category: category || "Technology",
      tags: generatedPost.tags,
      cover: "",
      view: 0,
      createAt: new Date(),
      updateAt: new Date()
    });

    return res.status(200).json({
      message: "AI post generated and saved successfully",
      post: postResponse
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Failed to generate or save post",
      details: error.message
    });
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { post } = req.body;

    const updatePostReponse = await updatePostById(id, post);

    return res.status(200).json({ message: `Post ${id} sucessfuly update` });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400).json({ message: "Required id" });
    }

    const postExist = await getPostById(id);

    if (!postExist) {
      return res.sendStatus(400).json({ message: "Post not found" });
    }

    const deleteResponse = await deletePostById(id);

    return res.status(200).json({ message: "Successfuly delete" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
