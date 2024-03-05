
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.deleteDeviceToken = functions.https.onRequest((req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is a required field.' });
    }

    // Hapus token dari dokumen pengguna di Firestore
    return admin.firestore().collection('users').doc(id).update({
        token: admin.firestore.FieldValue.delete()
    })
    .then(() => {
        console.log('Token deleted successfully');
        return res.status(200).json({ message: 'Token deleted successfully' });
    })
    .catch((error) => {
        console.error('Error deleting token:', error);
        return res.status(500).json({ error: 'Error deleting token.' });
    });
});