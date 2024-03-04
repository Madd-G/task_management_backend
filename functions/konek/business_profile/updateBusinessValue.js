const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

exports.updateBusinessValue = functions.https.onRequest(async (req, res) => {
    try {
        // Extract business value from the request body
        const { business_value } = req.body;

        // Check if businessValue is provided
        if (!business_value) {
            return res.status(400).json({ code: -1, message: 'Bad Request - Business value is required' });
        }

        // Update the business value in Firestore
        const businessRef = db.collection('business_profile').doc('konek');
        await businessRef.update({ business_value });

        // Send success response
        return res.status(200).json({ code: 1, message: 'Business value updated successfully' });
    } catch (error) {
        console.error('Error updating business value:', error);
        return res.status(500).json({ code: -1, message: 'Internal Server Error - Failed to update business value' });
    }
});