require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./server/routes/router");
const cookieParser  = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use("/cfms",router);

app.listen(5000, function() {
    console.log("Server started running on port 5000...");
});