require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const router = require("./server/routes/router");
const cookieParser  = require("cookie-parser");

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/cfms",router);

app.listen(3000, function() {
    console.log("Server started running on port 3000...");
});