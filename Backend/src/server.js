// const express = require('express');
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from './routes/auth.route.js';
import authMessages from './routes/message.route.js';

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use('/api/auth', authRoutes);
app.use('api/messages', authMessages);

app.listen(PORT ,() => {console.log('Server is running on port: ' + PORT);
})