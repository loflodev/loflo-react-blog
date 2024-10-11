import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isOwner } from "../middlewares/isOwner";

export default (router: express.Router) => {
  router.get("/user/:id", isAuthenticated, getUser);
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
