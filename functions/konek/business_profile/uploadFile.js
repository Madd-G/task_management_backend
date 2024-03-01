const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

exports.uploadFile = functions.https.onRequest((req, res) => {
  if (req.method === 'POST') {
    const busboy = new Busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();
    const uploads = {};
    const fileWrites = []; // Deklarasi variabel fileWrites

    busboy.on('file', (fieldname, file, filename) => {
      const filepath = path.join(tmpdir, filename);
      uploads[fieldname] = filepath;

      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);

      const promise = new Promise((resolve, reject) => {
        file.on('end', () => {
          writeStream.end();
        });
        writeStream.on('finish', resolve);
        writeStream.on('error', reject); // Penanganan kesalahan saat menulis file
      });

      fileWrites.push(promise);
    });

    busboy.on('finish', () => {
      Promise.all(fileWrites)
        .then(() => {
          for (const name in uploads) {
            const file = uploads[name];
            fs.unlinkSync(file);
          }
          res.send();
        })
        .catch(error => {
          console.error('Error while uploading files:', error);
          res.status(500).send('Internal Server Error');
        });
    });

    busboy.end(req.rawBody);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
});
