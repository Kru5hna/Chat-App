import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import authMessages from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

import cookieParser from "cookie-parser";

const PORT = ENV.PORT || 3000;
const app = express();

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use(express.json({limit : '5mb'})); // later in the video
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", authMessages);

// Production: serve Vite build
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../Frontend/dist");
  app.use(express.static(frontendPath));

  
  app.use((_, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  connectDB();
});
