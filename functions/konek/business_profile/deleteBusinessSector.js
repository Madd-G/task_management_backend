const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.deleteBusinessSector = functions.https.onRequest(async (req, res) => {
    try {
        // Extract index from query parameter
        const index = req.query.index;
        
        // Check if index is provided
        if (!index) {
            return res.status(400).json({ error: 'Index parameter is required.' });
        }

        // Get Firestore instance
        const firestore = admin.firestore();
        const docRef = firestore.collection('business_profile').doc('konek');

        // Get the document
        const docSnapshot = await docRef.get();

        // Check if document exists
        if (!docSnapshot.exists) {
            return res.status(404).json({ error: 'Document not found.' });
        }

        // Get the business_sector list
        let businessSectors = docSnapshot.data().business_sector || [];

        // Check if index is out of bounds
        if (index < 0 || index >= businessSectors.length) {
            return res.status(400).json({ error: 'Index is out of bounds.' });
        }

        // Remove item at the specified index
        businessSectors.splice(index, 1);

        // Update the document
        await docRef.update({ business_sector: businessSectors });

        // Send success response
        return res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
        // Send error response
        return res.status(500).json({ error: 'Error deleting item: ' + error.message });
    }
});
