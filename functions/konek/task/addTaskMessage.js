const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addTaskMessage = functions.https.onRequest(async (req, res) => {
    try {
        const { id, messages, updater } = req.body;

        if (!id || !messages) {
            return res.status(400).json({ error: 'ID and messages are required fields.' });
        }

        const timestamp = admin.firestore.Timestamp.now();
        messages.time = timestamp;

        const taskRef = admin.firestore().collection('task').doc(id);
        const taskDoc = await taskRef.get();

        if (!taskDoc.exists) {
            return res.status(404).json({ error: 'Task document not found.' });
        }

        const taskData = taskDoc.data();
        const existingMessages = taskData.messages || [];

        existingMessages.push(messages);

        await taskRef.update({
            messages: existingMessages,
            updater: updater,
        });

        return res.status(200).json({ message: 'Message added successfully.' });
    } catch (error) {
        console.error('Error adding message to task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
