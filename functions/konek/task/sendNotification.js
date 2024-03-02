const functions = require('firebase-functions');
const admin = require('firebase-admin');

const fcm = admin.messaging();

async function sendNotification(data) {
  try {
    const payload = {
      token: data.token,
      notification: {
        title: data.notification.title,
        body: data.notification.body,
      },
      data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        status: "done",
        orderId: "****"
      },
      android: {
        notification: {
          sound: "default"
        }
      }
    };

    await fcm.send(payload);
    console.log('Notification Sent: ', data);
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Error sending notification');
  }
}

exports.sendNotification = functions.https.onRequest(async (request, response) => {
  try {
    const data = request.body;
    await sendNotification(data);
    response.send("Notification Request Processed");
  } catch (error) {
    response.status(500).send("Error processing notification request");
  }
});

// Request body sample
// {
//   "notification": {
//     "title": "Hello from Devfest!",
//     "body": "Thank you for attending this talk"
//   },
//   "data": {
//     "click_action": "FLUTTER_NOTIFICATION_CLICK",
//     "status": "done",
//     "orderId": "****"
//   },
//   "token": "fE02ReNlQH6OMjT0yrfDFb:APA91bH7hSJ1wE9bVUW4mKoZF2mzBelNUPZtUNTaL2ybplAOfMijfp_oQ_Au8T0O5bZamqy-w432SJUNYiybK3eFAQ_H3egkum2D3LN8eh5PB6z2xzAEIKuOoJjcGdwdLHTnqY6dbcFV",
//   "android": {
//     "notification": {
//       "sound": "default"
//     }
//   }
// }