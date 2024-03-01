// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const db = admin.firestore();
// const cors = require('cors')({ origin: true });

// exports.login = functions.https.onRequest(async (request, response) => {
//     // Check if the request method is POST
//     if (request.method !== 'POST') {
//         return response.status(405).json({ code: -1, msg: 'Method Not Allowed' });
//     }

//     // Check if the request body contains the required data
//     const { name, bio, email, phone, avatar, role } = request.body;
//     if ( !name || !email) {
//         return response.status(400).json({ code: -1, msg: 'Bad Request - Missing required fields' });
//     }

//     try {
//         // Save user data to Firestore with createdAt and updatedAt fields
//         const now = new Date();
//         const userData = {
//             name,
//             email,
//             avatar,
//             bio: bio || null,
//             phone: phone || null,
//             role: null,
//             createdAt: now,
//             updatedAt: now
//         };
//         const docRef = await admin.firestore().collection('users').doc(); // Get reference to auto-generated document ID
//         await docRef.set(userData); // Set user data for the document

//         // Send success response with createdAt and updatedAt fields
//         return response.status(200).json({
//             code: 1,
//             msg: 'User has been created',
//             data: {
//                 id: docRef.id,
//                 name,
//                 email,
//                 avatar,
//                 bio: bio || null,
//                 phone: phone || null,
//                 role: role || null,
//                 createdAt: now,
//                 updatedAt: now
//             }
//         });
//     } catch (error) {
//         console.error('Error saving user data to Firestore:', error);
//         return response.status(500).json({ code: -1, msg: 'Internal Server Error' });
//     }
// });