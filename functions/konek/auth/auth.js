const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// https://stackoverflow.com/questions/47511677/firebase-cloud-function-your-client-does-not-have-permission-to-get-url-200-fr

const db = admin.firestore();
const app = express();

app.use(cors);
app.use(express.json());

// Hash password before saving to Firestore
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Login endpoint
app.post('/login', async (req, res) => {
    cors(req, res, async () => {
        try {
            const { id, password } = req.body;

            // Retrieve user data from Firestore
            const userSnapshot = await db.collection('users').doc(id).get();
            const userData = userSnapshot.data();

            // Check if user exists and password matches
            if (!userData || !(await bcrypt.compare(password, userData.password))) {
                return res.status(401).json({ code: -1, error: 'Authentication failed', message: 'Invalid id or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id }, 'WWW15.', { expiresIn: 60 });

            // Combine token with userData
            userData.token = token;

            return res.status(200).json({ code: 1, userData });
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ code: -1, error: 'Internal server error', message: 'Something went wrong' });
        }
    })
});

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
    cors(req, res, async () => {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
        }

        // nanti ganti dengan code acak yang lebih rumit
        jwt.verify(token, 'lNGq6dzFsDBwP5XnLj8GzRoI2h0rUQ9BmKs6AjvCcYTrDVp1f4ey3MuOiWH7taE', (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden', message: 'Failed to authenticate token' });
            }

            req.user = decoded;
            next();
        });
    })

};

// Signup endpoint
app.post('/signUp', async (req, res) => {
    cors(req, res, async () => {
        try {
            const { id, username, password,  email, role, createdAt, updatedAt, } = req.body;

            // Check if username already exists
            const userSnapshot = await db.collection('users').doc(id).get();
            if (userSnapshot.exists) {
                return res.status(400).json({ error: 'Username already exists', message: 'Please choose a different username' });
            }

            // Hash the password
            const hashedPassword = await hashPassword(password);

            // Create new user document in Firestore
            await db.collection('users').doc(id).set({
                id,
                username,
                password: hashedPassword,
                email,
                role,
                createdAt,
                updatedAt,
            });

            return res.status(201).json({ message: 'Signup successful' });
        } catch (error) {
            console.error('Error signing up:', error);
            return res.status(500).json({ error: 'Internal server error', message: 'Something went wrong' });
        }
    })
});


// Endpoint untuk reset password atau username
// dan verifikasi menggunakan favoriteFood

// Fungsi untuk mengirim email
const sendEmail = async (email, subject, message) => {
    // Konfigurasi SMTP untuk nodemailer (sesuaikan dengan server email Anda)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        // host: 'smtp.example.com',
        // port: 465,
        // secure: true, // true for 465, false for other ports
        auth: {
            user: 'akhmadnuralamsyah@gmail.com', // email pengirim
            pass: 'vvlo pkaz aosh bnrp' // password email pengirim
        }
    });

    // Pengaturan email
    const mailOptions = {
        from: 'akhmadnuralamsyah@gmail.com', // alamat email pengirim
        to: email, // alamat email penerima (alamat pengguna yang lupa)
        subject: subject, // subjek email
        text: message // isi email
    };

    // Kirim email
    await transporter.sendMail(mailOptions);
};

exports.auth = functions.https.onRequest(app);
