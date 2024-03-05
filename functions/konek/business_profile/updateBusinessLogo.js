const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

exports.updateBusinessLogo = functions.https.onRequest(async (req, res) => {
    try {
        // Extract business logo from the request body
        const { business_logo } = req.body;

        // Check if business logo is provided
        if (!business_logo) {
            return res.status(400).json({ code: -1, message: 'Bad Request - Business logo is required' });
        }

        // Update the business logo in Firestore
        const businessRef = db.collection('business_profile').doc('konek');
        await businessRef.update({ business_logo });

        // Send success response
        return res.status(200).json({ code: 1, message: 'Business logo updated successfully' });
    } catch (error) {
        console.error('Error updating business logo:', error);
        return res.status(500).json({ code: -1, message: 'Internal Server Error - Failed to update business logo' });
    }
});