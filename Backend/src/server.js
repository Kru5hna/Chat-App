// const express = require('express');
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from './routes/auth.route.js';
import authMessages from './routes/message.route.js';
import path from "path";

const PORT = process.env.PORT || 3000 ;

const app = express();
const __dirname = path.resolve();

app.use('/api/auth', authRoutes);
app.use('api/messages', authMessages);

// make ready for production
if(process.env.NODE_DEV === 'production') {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get('*', (req,res) => {
    app.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  })
}

app.listen(PORT ,() => {console.log('Server is running on port: ' + PORT);
})