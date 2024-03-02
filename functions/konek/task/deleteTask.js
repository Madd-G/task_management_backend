const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.deleteTask = functions.https.onRequest(async (req, res) => {
    const docId = req.path.split('/').pop(); // Ambil docId dari URL
    const docRef = admin.firestore().collection('task').doc(docId);
    
    try {
        await docRef.delete();
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send("Error deleting document: " + error.message);
    }
});
