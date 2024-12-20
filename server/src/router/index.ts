import express from "express";
import authentication from "./authentication";
import users from "./users";
import post from "./post"

const router = express.Router();

export default (): express.Router => {
  try {
    console.log('Setting up routes...');
    authentication(router);
    users(router);
    post(router);
    console.log('Routes set up successfully');
    return router;
  } catch (error) {
    console.error('Error setting up routes:', error);
    throw error;
  }
};
