const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getEmployeeNameRole = functions.https.onRequest(async (req, res) => {
    try {
        const usersCollection = admin.firestore().collection('users');
        const snapshot = await usersCollection.get();

        const employees = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.role && data.role !== 'owner') {
                const employee = {
                    id: doc.id,
                    username: data.username || '',
                    role: data.role || ''
                };
                employees.push(employee);
            }
        });

        return res.status(200).json(employees);
    } catch (error) {
        console.error('Error getting employees:', error);
        return res.status(500).send('Error getting employees: ' + error.message);
    }
});
