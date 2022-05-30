require("dotenv").config();
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mysql = require("promise-mysql");
const { v4: uuidv4 } = require('uuid');

// connection
let pool;
const connectDB = async () => {
    pool = await mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "",
        database: "cfms_db" 
    });
}
connectDB();

// ---------------- ROUTES --------------------

// user signup
router.post("/signup", async (req,res) => {

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const exists = await connection.query(`SELECT * FROM user where username='${inputs.username}'`);
        if(exists && exists.length > 0) {
            return res.status(500).json({message: "Username already exists Try another!"}); 
        }

        const hash = genHash(inputs.password);
        const result = await connection.query(`INSERT INTO user VALUES('${inputs.username}','${hash}','${inputs.mail}','${inputs.number}',${0},${0})`);
        if(!result || result.length == 0) {
            return res.status(500).json({message: "Insertion failed!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    const auth = {
        log: genHash(process.env.success),
        username: genHash(inputs.username)
    }
    res.cookie("auth", auth, {maxAge: 3 * 24 * 60 * 60 * 1000});
    res.status(200).json({ message: "Insertion success"});
});

// user login
router.get("/login",  async (req,res) => {
 
    const inputs = req.body;
    
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const result = await connection.query(`SELECT pass from user where username='${inputs.username}'`);
        if(!result || result.length == 0) {
            return res.status(404).json({message: "Username doesn't exist!"});
        }

        if(!bcrypt.compareSync(inputs.password, result[0].pass)) {
            return res.status(401).json({message: "Password doesn't match!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    const auth = {
        log: genHash(process.env.success),
        username: genHash(inputs.username)
    }
    res.cookie("auth", auth, {maxAge: 3 * 24 * 60 * 60 * 1000});
    res.status(200).json({ message: "Login success"});
});

// create a post
router.post("/post", async (req, res) => {

    if(!req.cookies.auth || !req.cookies.auth.log || !req.cookies.auth.username) {
        return res.status(401).json({message: "Login/Signup to create a post"});
    }

    const { log, username } = req.cookies.auth;
    if(!bcrypt.compareSync(process.env.success, log) || !username) {
        return res.status(401).json({message: "Login/Signup to create a post"});
    }

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const users = await connection.query(`SELECT username FROM user`);
        if(!users || users.length == 0) {
            return res.status(404).json({message: "No user exists"}); 
        }

        let userkey = "";
        for(let i = 0; i < users.length; i++) {
            if(bcrypt.compareSync(users[i].username, username)) {
                userkey = users[i].username;
                break;
            }
        }
        if(!userkey) {
            return res.status(404).json({message: "Cannot find your username!"}); 
        }

        const id = uuidv4();
        const verified = "no";
        const result = await connection.query(`INSERT INTO post VALUES('${id}','${verified}','${inputs.title}','${inputs.description}', '${inputs.type}','${userkey}', ${inputs.expected_fund}, ${0}, CURDATE())`);
        if(!result || result.length == 0) {
            return res.status(500).json({message: "Insertion failed!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post Creation success"});
});

// retreive all the posts
router.get("/posts", async (req, res) => {

    if(!req.cookies.auth || !req.cookies.auth.log || !req.cookies.auth.username) {
        return res.status(401).json({message: "Login/Signup to see all the posts"});
    }

    const { log, username } = req.cookies.auth;
    if(!bcrypt.compareSync(process.env.success, log) || !username) {
        return res.status(401).json({message: "Login/Signup to see all the posts"});
    }

    let posts = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        posts = await connection.query(`SELECT * FROM post where verified='yes'`);

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post retreival success", posts});
});

// retreive posts created by a user
router.get("/posts/created/:userid", async (req, res) => {

    if(!req.cookies.auth || !req.cookies.auth.log || !req.cookies.auth.username) {
        return res.status(401).json({message: "Login/Signup to see the post"});
    }

    const { log, username } = req.cookies.auth;
    if(!bcrypt.compareSync(process.env.success, log) || !username) {
        return res.status(401).json({message: "Login/Signup to see the post"});
    }

    let posts = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        posts = await connection.query(`SELECT * FROM post where verified='yes' and created_user_id='${req.params.userid}'`);

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post retreival success", posts});
});

// admin login
router.get(`${process.env.secret_route}`, async (req,res) => {
    const inputs = req.body;
    
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const result = await connection.query(`SELECT pass from adm_user where username='${inputs.username}'`);
        if(!result || result.length == 0) {
            return res.status(404).json({message: "Admin Username doesn't exist!"});
        }

        if(!bcrypt.compareSync(inputs.password, result[0].pass)) {
            return res.status(401).json({message: "Admin Password doesn't match!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    const auth = {
        log: genHash(process.env.admin_log),
        username: genHash(inputs.username)
    }
    res.cookie("auth", auth, {maxAge: 3 * 24 * 60 * 60 * 1000});
    res.status(200).json({ message: "Admin Login success"});
});

// admin verifies post
router.put(`${process.env.secret_route}/verify/:postid`, async (req, res) => {
    if(!req.cookies.auth || !req.cookies.auth.log || !req.cookies.auth.username) {
        return res.status(401).json({message: "Login/Signup"});
    }

    const { log, username } = req.cookies.auth;
    if(!bcrypt.compareSync(process.env.admin_log, log) || !username) {
        return res.status(401).json({message: "Login/Signup"});
    }

    let posts = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const result = await connection.query(`SELECT username from adm_user`);
        if(!result || result.length == 0) {
            return res.status(404).json({message: "Error while fetching admin!"});
        }

        if(!bcrypt.compareSync(result[0].username, username)) {
            return res.status(401).json({message: "Unauthorized to view this route"});
        }        

        postUpdated = await connection.query(`Update post set verified='yes' where post_id='${req.params.postid}'`);
        if(!postUpdated || postUpdated.length == 0) {
            return res.status(404).json({message: "No such post exist!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post verified!"});
});

// transaction
router.post("/transaction", async (req, res) => {

    if(!req.cookies.auth || !req.cookies.auth.log || !req.cookies.auth.username) {
        return res.status(401).json({message: "Login/Signup to make a transaction"});
    }

    const { log, username } = req.cookies.auth;
    if(!bcrypt.compareSync(process.env.success, log) || !username) {
        return res.status(401).json({message: "Login/Signup to make a transaction!"});
    }

    const inputs = req.body;
    
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const users = await connection.query(`SELECT username from user`);
        let userkey = "";
        for(let i = 0; i < users.length; i++) {
            if(bcrypt.compareSync(users[i].username, username)) {
                userkey = users[i].username;
                break;
            }
        }
        if(!userkey) {
            return res.status(404).json({message: "Cannot find specified username!"}); 
        }

        let result = await connection.query(`SELECT * from post where post_id='${inputs.post_id}' and verified='yes'`);
        if(!result || result.length == 0) {
            return res.status(404).json({message: "No such post exists!"});
        }

        result = await connection.query(`INSERT into transaction VALUES('${userkey}','${inputs.post_id}',${inputs.amount}, CURDATE())`);
        if(!result || result.length == 0) {
            return res.status(404).json({message: "No such post exists!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Transaction success"});
});

function genHash(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
    return hash;
}

function genSecret() {
    let randomString = crypto.randomBytes(64).toString("hex");
    return randomString;
}

module.exports = router;

// const nodemailer = require("nodemailer");

// function sendPublicKey(key, email) {
//     try {
//         const Transport = nodemailer.createTransport({
//             service : "Gmail",
//             auth : {
//                 user : process.env.email,
//                 pass : process.env.password 
//             }
//         });
//         const mailOptions = {
//             from : "Crypto wallet",
//             to : email,
//             subject : "Public key for Crpyto wallet",
//             html : `<p>Hey, thanks for signing into our app.</p><p><b>Public key: </b> ${key.substr(0,10)}</p><p>Use this for future logins.</p>`
//         };
//         return Transport.sendMail(mailOptions,(err,res) => {
//             if(err) {
//                 console.log(err);
//             }else {
//                 console.log("Successfully sent email!");
//             }
//         })
//     } catch(err) {
//         console.log(err);
//     }
// }
