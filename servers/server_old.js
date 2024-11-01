// server.js
const admin = require('firebase-admin');
const cron = require('node-cron');
const { DateTime } = require('luxon');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging();

console.log("Notification server started");

const sendNotification = async (tokens, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    tokens,
  };

  try {
    const response = await messaging.sendMulticast(message);
    console.log(`Notifications sent successfully. Success count: ${response.successCount}`);
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

const checkUpcomingSessions = async () => {
  const now = DateTime.now();
  const in30Minutes = now.plus({ minutes: 30 });

  try {
    const sessionsSnapshot = await db.collection('sessions')
      .where('date', '==', now.toISODate()) // Filter sessions for today
      .where('from', '>=', now.toFormat('HH:mm'))
      .where('from', '<=', in30Minutes.toFormat('HH:mm'))
      .get();

    if (sessionsSnapshot.empty) {
      console.log("No sessions found for notification.");
      return;
    }

    sessionsSnapshot.forEach(async (doc) => {
      const session = doc.data();
      const sessionTitle = session.sessionTitle || 'Upcoming Study Session';

      const tokens = [];
      for (const userId of session.sessionMembers) {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData.fcmToken) {
            tokens.push(userData.fcmToken);
          }
        }
      }

      if (tokens.length > 0) {
        sendNotification(tokens, `Reminder: ${sessionTitle} starts soon!`, `Your session at ${session.location} begins in less than 30 minutes.`);
      }
    });
  } catch (error) {
    console.error("Error checking sessions:", error);
  }
};

cron.schedule('*/30 * * * * *', checkUpcomingSessions);
