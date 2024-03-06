const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateTaskIsRead = functions.https.onRequest(async (req, res) => {
    try {
        const { id, is_read } = req.body;

        // Get Firestore instance
        const db = admin.firestore();

        // Update is_read field in the task document
        await db.collection('task').doc(id).update({
            is_read: is_read,

        });

        res.status(200).json({ message: 'Task is_read updated successfully' });
    } catch (error) {
        console.error('Error updating task is_read:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
