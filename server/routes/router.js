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

const checkCookie = async (req, res, next) => {
    if(!req.cookies.auth || !req.cookies.auth.log || !req.cookies.auth.userkey) {
        return res.status(401).json({message: "Please Login/Signup"});
    }

    const { log, userkey } = req.cookies.auth;
    console.log({ log, userkey });
    if(!bcrypt.compareSync(process.env.success, log) || !userkey) {
        return res.status(401).json({message: "Please Login/Signup"});
    }
    console.log("yes");
    next();
}

// ---------------- ROUTES --------------------

// check login
router.get("/credentials", checkCookie, (req,res) => {
    res.status(200).json({message: 'authenticated'});
});

// logout 
router.get("/logout", checkCookie, (req,res) => {
    res.clearCookie("auth");
    res.end();
});

// user signup
router.post("/signup", async (req,res) => {

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const exists = await connection.query(`SELECT * FROM user where username='${inputs.username}' or mail='${inputs.mail}'`);
        if(exists && exists.length > 0) {
            connection.release();
            return res.status(500).json({message: "Username or mail already exists. Try another!"}); 
        }

        const auth = {
            log: genHash(process.env.success),
            userkey: genHash(uuidv4())
        }
   
        const hash = genHash(inputs.password);
        const result = await connection.query(`INSERT INTO user VALUES('${auth.userkey}', '${inputs.username}','${hash}','${inputs.mail}','${inputs.number}',${0},${0}, CURDATE())`);
        if(!result || result.length == 0) {
            connection.release();
            return res.status(500).json({message: "Insertion failed!"});
        }
        
        console.log(auth);
        res.cookie("auth", auth, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/"});

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Insertion success"});
});

// user login
router.post("/login",  async (req,res) => {
 
    const inputs = req.body;
    
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const result = await connection.query(`SELECT * from user where username='${inputs.username}'`);
        if(!result || result.length == 0) {
            connection.release();
            return res.status(404).json({message: "Username doesn't exist!"});
        }

        if(!bcrypt.compareSync(inputs.password, result[0].pass)) {
            connection.release();
            return res.status(401).json({message: "Password doesn't match!"});
        }

        const auth = {
            log: genHash(process.env.success),
            userkey: result[0].userkey
        }
        console.log(auth)
        res.cookie("auth", auth, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/"});

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Login success"});
});

// create a post
router.post("/post", checkCookie, async (req, res) => {

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const user = await connection.query(`SELECT username FROM user where userkey='${req.cookies.auth.userkey}'`);
        if(!user || user.length == 0) {
            connection.release();
            return res.status(404).json({message: "No user exists"}); 
        }
        console.log(user);
        console.log(inputs.description.length);
        const id = uuidv4();
        const verified = "no";
        let desc = inputs.description;
        desc = desc.replace(/[^\w\s]/gi, '')
        
        const result = await connection.query(`INSERT INTO post VALUES('${id}','${verified}','${inputs.title}','${desc}', '${inputs.type}','${req.cookies.auth.userkey}', ${inputs.expected_fund}, ${0}, CURDATE())`);
        if(!result || result.length == 0) {
            connection.release();
            return res.status(500).json({message: "Insertion failed!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post Creation success"});
});

// edit a post
router.put("/post", checkCookie, async (req, res) => {

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const post = await connection.query(`UPDATE post SET title='${inputs.title}', description='${inputs.description}', category='${inputs.category}' where post_id='${inputs.id}' and created_user='${req.cookies.auth.userkey}'`);
        console.log(post);
        if(!post || post.length == 0) {
            connection.release();
            return res.status(404).json({message: "No such post exists"}); 
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post Updation success"});
});

// retreive all the posts
router.get("/posts", checkCookie, async (req, res) => {

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

// retreive specific post
router.get("/post/:postid", checkCookie, async (req, res) => {

    let posts = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        posts = await connection.query(`SELECT *, post.fund_raised AS post_fund, user.username AS author FROM post, user where post.post_id='${req.params.postid}' and post.created_user=user.userkey`);
    
        if(await posts[0].created_user == req.cookies.auth.userkey) {
            connection.release();
            return res.status(200).json({ message: "Post retreival success", posts, created: true});
        }
        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post retreival success", posts, created: false});
});

// retreive posts created by a user
router.get("/posts/created", checkCookie, async (req, res) => {

    let posts = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        posts = await connection.query(`SELECT * FROM post where created_user='${req.cookies.auth.userkey}'`);

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Post retreival success", posts});
});

// retreive posts donated by a user
router.get("/posts/donated", checkCookie, async (req, res) => {

    let posts = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        posts = await connection.query(`SELECT *, transaction.amount FROM post, transaction where post.post_id=transaction.post_id and transaction.user_id='${req.cookies.auth.userkey}'`);
        console.log(posts);
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
            connection.release();
            return res.status(404).json({message: "Admin Username doesn't exist!"});
        }

        if(!bcrypt.compareSync(inputs.password, result[0].pass)) {
            connection.release();
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
router.post("/transaction", checkCookie, async (req, res) => {

    const inputs = req.body;
    
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        let result = await connection.query(`SELECT * from post where post_id='${inputs.post_id}' and verified='yes'`);
        if(!result || result.length == 0) {
            connection.release();
            return res.status(404).json({message: "No such post exists!"});
        }

        result = await connection.query(`SELECT * from transaction where post_id='${inputs.post_id}' and user_id='${req.cookies.auth.userkey}'`);
        if(await result && await result.length != 0) {
            await connection.query(`UPDATE transaction SET amount = amount + ${inputs.amount} where post_id='${inputs.post_id}' and user_id='${req.cookies.auth.userkey}'`);
            connection.release();
            return res.status(200).json({message: "Transaction success"});
        }

        result = await connection.query(`INSERT into transaction VALUES('${inputs.post_id}', '${req.cookies.auth.userkey}', CURDATE(), ${inputs.amount})`);
        if(!result || result.length == 0) {
            connection.release();
            return res.status(404).json({message: "No such post exists!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Transaction success"});
});

// get donators for a specific post
router.get("/donators/:postid", checkCookie, async (req, res) => {

    let transactions = [];
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        transactions = await connection.query(`SELECT transaction.amount AS donation, user.username AS name FROM transaction, user where transaction.post_id='${req.params.postid}' and transaction.user_id=user.userkey`);
        let isdonator = await connection.query(`SELECT amount FROM transaction where post_id='${req.params.postid}' and user_id='${req.cookies.auth.userkey}'`);
        
        if(isdonator && isdonator.length != 0) {
            connection.release();
            return res.status(200).json({ message: "Donators retreival success", transactions, donated: true, donatedAmt: isdonator[0].amount});
        }
        
        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Donators retreival success", transactions, donated: false, donatedAmt: 0});
});

// get account details 
router.get("/account", checkCookie, async (req, res) => {

    let account = [];
    let posts = 0;
    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        account = await connection.query(`SELECT * from user where userkey='${req.cookies.auth.userkey}'`);
        if(!account || account.length == 0) {
            connection.release();
            return res.status(404).json({ message: 'Account not found' });
        }
        let result = await connection.query(`SELECT * from post where created_user='${req.cookies.auth.userkey}'`);
        if(result && result.length != 0) {
            posts = result.length;
        }
        
        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Account retreival success", account, posts});
});

// edit an account
router.put("/account", checkCookie, async (req, res) => {

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const account = await connection.query(`UPDATE user SET mail='${inputs.mail}', number='${inputs.number}' where userkey='${req.cookies.auth.userkey}'`);
        console.log(account);
        if(!account || account.length == 0) {
            connection.release();
            return res.status(404).json({message: "No such account exists"}); 
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Account Updation success"});
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
