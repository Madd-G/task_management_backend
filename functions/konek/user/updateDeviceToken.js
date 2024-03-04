const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateDeviceToken = functions.https.onRequest((req, res) => {
    const { id, token } = req.body;

    if (!id || !token) {
        return res.status(400).json({ error: 'ID and token are required fields.' });
    }

    // Update the token in the Firestore
    return admin.firestore().collection('users').doc(id).update({
        token: token
    })
    .then(() => {
        console.log('Token updated successfully');
        return res.status(200).json({ message: 'Token updated successfully' });
    })
    .catch((error) => {
        console.error('Error updating token:', error);
        return res.status(500).json({ error: 'Error updating token.' });
    });
});
