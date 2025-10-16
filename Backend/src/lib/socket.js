import express from "express";
import http from "http";''
import { ENV } from "./env.js";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app =  express();

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: [ENV.CLIENT_URL],
      credentials: true,
   },
});

// apply auth middleware to all socket connections

io.use(socketAuthMiddleware);

// storing online users
const userSocketMap = {}; // userId: socketId

io.on("connection", (socket) => {
   console.log('A User Connected ', socket.user.fullName);
   
   const userId = socket.userId;
   userSocketMap[userId] = socket.id;
   
   // .emit() is used to send events to all connected users
   // like this guy just logged In (Online)

   io.emit("getOnlineUsers", Object.keys(userSocketMap));
   // fakt keys pathvat ahe "userId"

   socket.on("disconnect", () => {
      console.log('A User Disconnected ', socket.user.fullName);
      delete userSocketMap[userId];
      // updated List   
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      
   })
})

export { io, app, server };