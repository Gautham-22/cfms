const express = require("express");
const app = express();
const router = require("./server/routes/router");


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/cwms",router);



app.listen(3000, function() {
    console.log("Server started running on port 3000...");
});