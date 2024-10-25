import {
  deletePostById,
  getPostById,
  getPosts,
  savePost,
  updatePostById,
} from "../db/post";
import express from "express";

export const getPostList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
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
    const {
      title,
      content,
      author,
      category,
      tags,
      cover,
      view,
      createAt,
      token,
    } = req.body;

    if (!title || !content || !author || !token) {
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
