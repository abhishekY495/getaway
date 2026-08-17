import express from "express";
import { chatting } from "../controller/chat-controller.js";

export const chatRoutes = express.Router();

chatRoutes.post("/", chatting);
