import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import { startAutomatedPosting } from './services/autoPost';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Log environment variables (without sensitive data)
console.log('Environment check:', {
  mongoDbConfigured: !!process.env.MONGODB_URI,
  openAiConfigured: !!process.env.OPENAI_API_KEY,
  port: process.env.PORT || 8080
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Set up routes
app.use("/", router());

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start the server after MongoDB connection is established
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      // Start automated posting after server is running
      startAutomatedPosting();
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
