
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.deleteDeviceToken = functions.https.onRequest((req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is a required field.' });
    }

    // Delete FCMToken from user
    return admin.firestore().collection('users').doc(id).update({
        fcmToken: admin.firestore.FieldValue.delete()
    })
    .then(() => {
        console.log('FCMToken deleted successfully');
        return res.status(200).json({ message: 'FCMToken deleted successfully' });
    })
    .catch((error) => {
        console.error('Error deleting FCMToken:', error);
        return res.status(500).json({ error: 'Error deleting FCMToken.' });
    });
});