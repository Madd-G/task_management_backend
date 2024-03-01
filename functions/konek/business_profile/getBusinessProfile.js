const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// Endpoint to retrieve business profile data
exports.getBusinessProfile = functions.https.onRequest(async (req, res) => {
    try {
        // Retrieve data from Firestore
        const snapshot = await db.collection('business_profile').doc('konek').get();
        
        // Check if the document exists
        if (!snapshot.exists) {
            return res.status(404).json({ error: 'Business profile not found', message: 'Business profile data not found in Firestore' });
        }

        // Extract data from the document
        const data = snapshot.data();

        // Create response object with data retrieved from Firestore
        const businessProfile = {
            business_logo: data.business_logo || '',
            business_name: data.business_name || '',
            business_sector: data.business_sector || [],
            business_value: data.business_value || ''
        };

        // Send response with business profile data
        return res.status(200).json(businessProfile);
    } catch (error) {
        console.error('Error retrieving business profile:', error);
        return res.status(500).json({ error: 'Internal server error', message: 'Something went wrong while retrieving business profile' });
    }
});