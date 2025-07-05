import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shortUrlRoute from './src/routes/short_url.route.js';
import { redirectFromShortUrl } from './src/contorller/short_url.controller.js';

dotenv.config('./.env');

/** @Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res)=>{
    res.send("Welcome to the Short ASAP URL Shortener API");
})

app.use("/api/create", shortUrlRoute);

app.get("/:id", redirectFromShortUrl);

app.listen(5000, ()=>{
    connectDB();
    console.log("Server is running on http://localhost:5000");
})