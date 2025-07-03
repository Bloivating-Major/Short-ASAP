import express from 'express';
import { nanoid } from 'nanoid';
const app = express();
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shortUrl from './src/models/short_url.model.js';

dotenv.config('./.env');

/** @Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res)=>{
    res.send("Welcome to the Short ASAP URL Shortener API");
})

app.post("/api/create", (req, res)=> {
    const {url}  = req.body;
    const shortUrlCode = nanoid(7);
    const newShortUrl = new shortUrl(
        {
            full_url: url,
            short_url: shortUrlCode,
        }
    )
    newShortUrl.save();
    res.send(nanoid(7));
})

app.get("/:id", async (req, res)=> {
    const { id } = req.params;
    const url = await shortUrl.findOne({ short_url: id});
    if(url){
        res.redirect(url.full_url);
    }else{
        res.status(404).send("Not Found");
    }
})

app.listen(5000, ()=>{
    connectDB();
    console.log("Server is running on http://localhost:5000");
})