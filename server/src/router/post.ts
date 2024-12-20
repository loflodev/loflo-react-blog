import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  updatePost,
  createAutoPost,
} from "../controllers/post";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isOwner } from "../middlewares/isOwner";

export default (router: express.Router) => {
  router.post("/post", isAuthenticated, createPost);
  router.post("/post/auto", isAuthenticated, createAutoPost);
  router.get("/post", getPostList);
  router.get("/post/:id", getPost);
  router.delete("/post/:id", isAuthenticated, isOwner, deletePost);
  router.patch("/post/:id", isAuthenticated, isOwner, updatePost);
};
