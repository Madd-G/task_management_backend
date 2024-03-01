const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

exports.updateBusinessName = functions.https.onRequest(async (req, res) => {
    try {
        // Extract business name from the request body
        const { business_name } = req.body;

        // Check if businessName is provided
        if (!business_name) {
            return res.status(400).json({ code: -1, message: 'Bad Request - Business name is required' });
        }

        // Update the business name in Firestore
        const businessRef = db.collection('business_profile').doc('konek');
        await businessRef.update({ business_name });

        // Send success response
        return res.status(200).json({ code: 1, message: 'Business name updated successfully' });
    } catch (error) {
        console.error('Error updating business name:', error);
        return res.status(500).json({ code: -1, message: 'Internal Server Error - Failed to update business name' });
    }
});