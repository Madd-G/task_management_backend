const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateTaskDeadline = functions.https.onRequest(async (req, res) => {
    try {
        const { id, end_date, updater } = req.body;

        // Get Firestore instance
        const db = admin.firestore();

        const currentTimestamp = admin.firestore.Timestamp.now();

        // Update deadline field in the task document
        await db.collection('task').doc(id).update({
            end_date: new Date(end_date._seconds * 1000 + end_date._nanoseconds / 1000000),
            updater: updater,
            updated_at : currentTimestamp,
        });

        res.status(200).json({ message: 'Task deadline updated successfully' });
    } catch (error) {
        console.error('Error updating task deadline:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
