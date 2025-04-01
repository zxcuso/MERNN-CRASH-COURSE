// const express = require('express');   
console.log(process.env.NrODE_ENV);
import express from 'express';
import dotenv from "dotenv";
import path from "path"; //configuration for uploading this project
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.routes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve(); // for the purpose of uploading project and to determine the absolute path

app.use(express.json()); //allows us to accept json in the req.body

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
// mA4V3r2ebwz9g2UH