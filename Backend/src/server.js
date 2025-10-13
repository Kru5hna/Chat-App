import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import cookieParser from "cookie-parser";

const PORT = ENV.PORT || 3000;

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production: serve Vite build
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../Frontend/dist");
  app.use(express.static(frontendPath));

  
  app.use((_, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  connectDB();
});
