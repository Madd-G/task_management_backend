const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateDeviceToken = functions.https.onRequest((req, res) => {
    const { id, fcmToken } = req.body;

    if (!id || !fcmToken) {
        return res.status(400).json({ error: 'ID and fcmToken are required fields.' });
    }

    // Update the fcmToken in the Firestore
    return admin.firestore().collection('users').doc(id).update({
        fcmToken: fcmToken
    })
    .then(() => {
        console.log('fcmToken updated successfully');
        return res.status(200).json({ message: 'fcmToken updated successfully' });
    })
    .catch((error) => {
        console.error('Error updating fcmToken:', error);
        return res.status(500).json({ error: 'Error updating fcmToken.' });
    });
});
