require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("promise-mysql");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// connection
let pool;
const connectDB = async () => {
    pool = await mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "",
        database: "cwms_db" 
    });
}
connectDB();

// routes
router.post("/signup", async (req,res) => {

    const publickey = crypto.createHash('sha256').update(genSecret()).digest('hex');
    const privatekey = crypto.createHash('sha256').update(genSecret()).digest('hex');

    const inputs = req.body;

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const exists = await connection.query(`SELECT * FROM user where username='${inputs.username}' or mail='${inputs.mail}'`);
        if(exists && exists.length > 0) {
            return res.status(500).json({message: "Username or mail already exists!"}); 
        }

        const hash = genHash(inputs.password);
        const result1 = await connection.query(`INSERT INTO user VALUES('${inputs.username}','${hash}','${inputs.mail}')`);
        if(!result1 || result1.length == 0) {
            return res.status(500).json({message: "Insertion failed!"});
        }
        const result2 = await connection.query(`INSERT INTO f88375d2fa5f62 VALUES('${inputs.username}','${publickey}','${privatekey}')`);
        if(!result2 || result2.length == 0) {
            return res.status(500).json({message: "Key generation failed!"}); 
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    sendPublicKey(publickey, inputs.mail);
    res.status(200).json({ message: "Insertion success"});
});

router.get("/login", async (req,res) => {
 
    const inputs = req.body;
    if(inputs.publickey.length != 10) {
        return res.status(404).json({message: "Publickey doesn't exist!"});
    }

    try {
        const connection = await pool.getConnection();
        if(!connection) {
            return res.status(500).json({message: "Database connection failed!"})
        }

        const result = await connection.query(`SELECT pass from user WHERE username IN (SELECT username FROM f88375d2fa5f62 where public_key LIKE '${inputs.publickey}%')`);
        if(!result || result.length == 0) {
            return res.status(404).json({message: "Publickey doesn't exist!"});
        }

        if(!bcrypt.compareSync(inputs.password, result[0].pass)) {
            return res.status(401).json({message: "Password doesn't match!"});
        }

        connection.release();

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Login success"});
});

module.exports = router;

function genSecret() {
    let randomString = crypto.randomBytes(64).toString("hex");
    return randomString;
} 

function genHash(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
    return hash;
}

function sendPublicKey(key, email) {
    try {
        const Transport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : process.env.email,
                pass : process.env.password 
            }
        });
        const mailOptions = {
            from : "Crypto wallet",
            to : email,
            subject : "Public key for Crpyto wallet",
            html : `<p>Hey, thanks for signing into our app.</p><p><b>Public key: </b> ${key.substr(0,10)}</p><p>Use this for future logins.</p>`
        };
        return Transport.sendMail(mailOptions,(err,res) => {
            if(err) {
                console.log(err);
            }else {
                console.log("Successfully sent email!");
            }
        })
    } catch(err) {
        console.log(err);
    }
}