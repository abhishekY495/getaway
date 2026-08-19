import express from "express";
import {
  addUser,
  addExpoPushToken,
  myInfo,
} from "../controller/user-controller.js";

export const userRoutes = express.Router();

userRoutes.get("/info", myInfo);
userRoutes.post("/add", addUser);
userRoutes.post("/add-expo-push-token", addExpoPushToken);
