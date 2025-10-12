import express from "express";
import http from "http";''
import { ENV } from "./env";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware";

const app =  express();

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: [ENV.CLIENT_URL],
      credentials: true,
   },
});

// apply auth middleware to all socket connections

io.use(socketAuthMiddleware)