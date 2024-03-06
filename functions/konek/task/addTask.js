const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addTask = functions.https.onRequest((req, res) => {
    const { id, name, category, weight, start_date, end_date, status, assignee, target, description, progress, priority, image_url } = req.body;

    // Get the Firestore instance
    const db = admin.firestore();

    // Buat objek Timestamp untuk created_at dan updated_at
    const currentTimestamp = admin.firestore.Timestamp.now();

    // Check if document with given ID already exists
    db.collection('task').doc(id).get()
        .then(doc => {
            if (doc.exists) {
                console.error("Document with ID", id, "already exists");
                res.status(400).json({ code: -1, message: "Document with the given ID already exists" });
            } else {
                // Add the task to the collection
                db.collection('task').doc(id).set({
                    id: id,
                    name: name,
                    category: category,
                    weight: weight,
                    start_date: new Date(start_date._seconds * 1000 + start_date._nanoseconds / 1000000),
                    end_date: new Date(end_date._seconds * 1000 + end_date._nanoseconds / 1000000),
                    status: status,
                    assignee: assignee,
                    target: target,
                    progress: progress,
                    description: description,
                    priority: priority,
                    created_at: currentTimestamp,
                    updated_at: currentTimestamp,
                    image_url: image_url,

                })
                    .then(() => {
                        console.log("Task added with ID: ", id);
                        res.status(200).json({ code: 1, message: "Task added successfully" });
                    })
                    .catch((error) => {
                        console.error("Error adding task: ", error);
                        res.status(500).json({ code: -1, message: "Error adding task: " + error.message });
                    });
            }
        })
        .catch(error => {
            console.error("Error checking if document exists:", error);
            res.status(500).json({ code: -1, message: "Error checking if document exists: " + error.message });
        });
});