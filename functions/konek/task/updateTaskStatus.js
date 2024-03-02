const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateTaskStatus = functions.https.onRequest(async (req, res) => {
    try {
        const { id, status } = req.body;

        // Get Firestore instance
        const db = admin.firestore();

        const currentTimestamp = admin.firestore.Timestamp.now();

        // Update status field in the task document
        await db.collection('task').doc(id).update({
            status: status,
            updated_at : currentTimestamp,
        });

        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
