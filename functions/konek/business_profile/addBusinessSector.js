const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addBusinessSector = functions.https.onRequest(async (req, res) => {
    try {
        // Extract new business sector from request body
        const { business_sector } = req.body;

        // Check if business sector is provided
        if (!business_sector) {
            return res.status(400).json({ error: 'Business sector parameter is required.' });
        }

        // Get Firestore instance
        const firestore = admin.firestore();
        const docRef = firestore.collection('business_profile').doc('konek');

        // Get the document
        const docSnapshot = await docRef.get();

        // Check if document exists
        if (!docSnapshot.exists) {
            return res.status(404).json({ error: 'Document "konek" not found.' });
        }

        // Get the current business sectors list
        let businessSectors = docSnapshot.data().business_sector || [];

        // Add the new business sector to the list
        businessSectors.push(business_sector);

        // Update the document
        await docRef.update({ business_sector: businessSectors });

        // Send success response
        return res.status(200).json({ message: 'Business sector added successfully.' });
    } catch (error) {
        // Send error response
        return res.status(500).json({ error: 'Error adding business sector: ' + error.message });
    }
});
