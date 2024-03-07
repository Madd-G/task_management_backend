const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getEmployeeFCMToken = functions.https.onRequest(async (req, res) => {
    try {
        const { doc_id } = req.body;

        if (!doc_id) {
            return res.status(400).json({ error: 'Document ID is required.' });
        }

        const userRef = admin.firestore().collection('users').doc(doc_id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User document not found.' });
        }

        const userData = userDoc.data();
        const fcmToken = userData.fcmToken || '';

        return res.status(200).json({ fcmToken });
    } catch (error) {
        console.error('Error getting FCM token:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
