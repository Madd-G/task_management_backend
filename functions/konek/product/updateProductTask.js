const functions = require('firebase-functions');
const admin = require('firebase-admin');

/// Masih perlu diperiksa lagi
exports.updateProductTask = functions.https.onRequest((req, res) => {
    const { id, name, category, weight, start_date, end_date, status } = req.body;
    
    // Get the Firestore instance
    const db = admin.firestore();

    // Add the product task to the collection
    db.collection('product').doc(id).set({
        name: name,
        category: category,
        weight: weight,
        start_date: new Date(start_date._seconds * 1000 + start_date._nanoseconds / 1000000), // Convert to milliseconds
        end_date: new Date(end_date._seconds * 1000 + end_date._nanoseconds / 1000000), // Convert to milliseconds
        status: status,
    })
    .then(() => {
        console.log("Product task added with ID: ", id);
        res.status(200).json({ code: "1", message: "Product task added successfully" });
    })
    .catch((error) => {
        console.error("Error adding product task: ", error);
        res.status(500).json({ code: "-1", message: "Error adding product task: " + error.message });
    });
});



