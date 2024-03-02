const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateTaskPriority = functions.https.onRequest(async (req, res) => {
    try {
        const { id, priority } = req.body;

        // Get Firestore instance
        const db = admin.firestore();

        const currentTimestamp = admin.firestore.Timestamp.now();

        // Update priority field in the task document
        await db.collection('task').doc(id).update({
            priority: priority,
            updated_at : currentTimestamp,
        });

        res.status(200).json({ message: 'Task priority updated successfully' });
    } catch (error) {
        console.error('Error updating task priority:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
