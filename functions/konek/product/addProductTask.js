const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addProductTask = functions.https.onRequest((req, res) => {
    const { id, name, category, weight, start_date, end_date, status } = req.body;
    
    // Get the Firestore instance
    const db = admin.firestore();

    // Check if document with given ID already exists
    db.collection('product').doc(id).get()
    .then(doc => {
        if (doc.exists) {
            console.error("Document with ID", id, "already exists");
            res.status(400).json({ code: "-1", message: "Document with the given ID already exists" });
        } else {
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
        }
    })
    .catch(error => {
        console.error("Error checking if document exists:", error);
        res.status(500).json({ code: "-1", message: "Error checking if document exists: " + error.message });
    });
});




