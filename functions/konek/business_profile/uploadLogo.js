const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors')({ origin: true });

const app = express();
app.use(bodyParser.json());
app.use(fileUpload());

// Endpoint untuk mengunggah gambar
exports.uploadLogo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            // Pastikan ada file yang diunggah
            if (!req.files) {
                console.error('No files were uploaded. (!req.files)');
                return res.status(400).json({ code: -1, msg: 'No files were uploaded.' });
            }

            // Pastikan ada file yang diunggah
            if (Object.keys(req.files).length === 0) {
                console.error('No files uploaded in req.files. (Object.keys(req.files).length === 0)');
                return res.status(400).json({ code: -1, msg: 'No files were uploaded.' });
            }

            // Dapatkan file dari request
            const uploadedFile = req.files.file;

            // Simpan file di Firebase Storage
            const fileRef = admin.storage().bucket("gs://konek-mobile.appspot.com").file(uploadedFile.name);
            await fileRef.save(uploadedFile.data);

            // Dapatkan URL publik dari file yang diunggah
            const url = await fileRef.getSignedUrl({
                action: 'read',
                expires: '01-01-2030', // Atur tanggal kedaluwarsa URL di sini
            });

            // Perbarui dokumen di Firestore dengan URL gambar yang baru
            await admin.firestore().collection('business_profile').doc('konek').update({
                business_logo: url,
            });

            console.log('File uploaded successfully:', url);

            // Respon dengan URL publik file yang diunggah
            return res.status(200).json({ code: 1, msg: 'File uploaded successfully', url: url });
        } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).json({ code: -1, msg: 'Internal Server Error' });
        }
    })
});
