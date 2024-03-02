const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.updateTaskProgress = functions.https.onRequest(async (req, res) => {
    try {
        const { id, progress } = req.body;

        const db = admin.firestore();

        const currentTimestamp = admin.firestore.Timestamp.now();

        await db.collection('task').doc(id).update({
            progress: progress,
            updated_at: currentTimestamp
        });

        res.status(200).json({ message: 'Task progress updated successfully' });
    } catch (error) {
        console.error('Error updating task progress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
