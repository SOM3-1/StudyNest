const admin = require('firebase-admin');
const { DateTime } = require('luxon');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ''
});

const db = admin.firestore();

async function checkAndMoveExpiredSessions() {
  try {
    const now = DateTime.now();
    const thirtyMinutesAgo = now.minus({ minutes: 30 });

    console.log(`Checking for sessions expired before ${thirtyMinutesAgo.toFormat('HH:mm')} on ${now.toISODate()}`);

    const sessionsRef = db.collection('sessions');
    const snapshot = await sessionsRef
      .where('date', '==', now.toISODate())
      .where('from', '<=', thirtyMinutesAgo.toFormat('HH:mm'))
      .get();

    if (snapshot.empty) {
      console.log('No expired sessions found');
      return;
    }

    snapshot.forEach(async (doc) => {
      const session = doc.data();
      console.log(`Session "${session.sessionTitle}" has expired, moving to expiredSessions`);

      try {
        await db.collection('expiredSessions').doc(doc.id).set(session);

        await db.collection('sessions').doc(doc.id).delete();

        console.log(`Session "${session.sessionTitle}" moved to expiredSessions and removed from sessions`);
      } catch (error) {
        console.error(`Error moving session "${session.sessionTitle}" to expiredSessions:`, error);
      }
    });
  } catch (error) {
    console.error('Error checking for expired sessions:', error);
  }
}

checkAndMoveExpiredSessions().then(() => {
  console.log('Expired sessions check completed.');
  process.exit(0);
});
