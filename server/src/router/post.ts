import express from "express";
import { createPost, deletePost, getPost, getPostList, updatePost } from "../controllers/post";
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: express.Router) => {
  router.post("/post", isAuthenticated, createPost);
  router.get("/post", getPostList);
  router.get("/post/:id", getPost);
  router.delete("/post/:id", isAuthenticated, deletePost);
  router.patch("/post/:id", isAuthenticated, updatePost);
};
