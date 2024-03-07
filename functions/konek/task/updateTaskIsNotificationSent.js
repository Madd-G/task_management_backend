const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateTaskIsNotificationSent = functions.https.onRequest(async (req, res) => {
    try {
        const { id, is_notification_sent } = req.body;

        // Get Firestore instance
        const db = admin.firestore();

        // Update is_notification_sent field in the task document
        await db.collection('task').doc(id).update({
            is_notification_sent: is_notification_sent,

        });

        res.status(200).json({ message: 'Task is_notification_sent updated successfully' });
    } catch (error) {
        console.error('Error updating task is_notification_sent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
