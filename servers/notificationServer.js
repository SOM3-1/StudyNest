const admin = require('firebase-admin');
const cron = require('node-cron');
const { DateTime } = require('luxon');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ''
});

const db = admin.firestore();
const sentNotifications = new Set();

async function checkAndSendNotifications() {
  try {
    const now = DateTime.now();
    const twentyNineMinutesLater = now.plus({ minutes: 29 });
    const thirtyMinutesLater = now.plus({ minutes: 30 });

    console.log(`Checking sessions starting between ${twentyNineMinutesLater.toFormat('HH:mm')} and ${thirtyMinutesLater.toFormat('HH:mm')} on ${now.toISODate()}`);
console.log()
    const sessionsRef = db.collection('sessions');
    const snapshot = await sessionsRef
    .where('from', '>=', twentyNineMinutesLater.toUTC().toISO()) 
    .where('from', '<=', thirtyMinutesLater.toUTC().toISO())
    .get();

    if (snapshot.empty) {
      console.log('No sessions starting in the next 29-30 minutes');
      return;
    }

    snapshot.forEach(async (doc) => {
      const session = doc.data();
      console.log(`Session "${session.sessionTitle}" is starting soon`);

      const membersSnapshot = await db.collection('sessions').doc(doc.id).collection('members').get();
      if (!membersSnapshot.empty) {
        membersSnapshot.forEach(async (memberDoc) => {
          const member = memberDoc.data();
          const fcmToken = member.fcmToken;
          const userId = member.userId;

          const notificationKey = `${doc.id}_${userId}`;
          if (sentNotifications.has(notificationKey)) {
            console.log(`Notification already sent for session ${session.sessionTitle} to user ${userId}`);
            return;
          }

          if (fcmToken) {
            try {
                console.log(session)
              await sendNotification(fcmToken, session.sessionTitle, session.location, userId);
              sentNotifications.add(notificationKey); // Track sent notifications
              await db.collection('sentNotifications').doc(notificationKey).set({ timestamp: now.toISO() });
            } catch (error) {
              console.error(`Failed to send notification to user ${userId} for session "${session.sessionTitle}":`, error);
            }
          } else {
            console.warn(`No FCM token for user ${member.userId}`);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error checking sessions:', error);
  }
}

function sendNotification(token, sessionTitle, location, userId) {
  const message = {
    notification: {
      title: 'Upcoming Session Reminder',
      body: `Your session "${sessionTitle}" at "${location}" starts in less than 30 minutes.`,
    },
    data: {
      userId: userId,
      location: location,
    },
    token: token,
  };

  return admin.messaging().send(message)
    .then(() => {
      console.log(`Notification sent for session: ${sessionTitle} to user ${userId}`);
    })
    .catch((error) => {
      console.error(`Error sending notification for session "${sessionTitle}" to user ${userId}`, error);
    });
}

cron.schedule('*/30 * * * * *', checkAndSendNotifications);
console.log('Notification server started');
