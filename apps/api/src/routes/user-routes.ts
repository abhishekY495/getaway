import express from "express";
import { addUser, myInfo } from "../controller/user-controller.js";

export const userRoutes = express.Router();

userRoutes.get("/info", myInfo);
userRoutes.post("/add", addUser);
