import { Session } from '@constants/sessions';
import firestore from '@react-native-firebase/firestore';
import { log } from '@services/Logger';
import { getFirebaseToken } from '@services/notifications/firebaseToken';

export const saveSessionToFirestore = async (session: Session): Promise<void> => {
  try {

    await firestore().collection('sessions').doc(session.sessionId).set(session);

    log.info(`Session saved to Firestore: ${session}`);
    for (const userId of session.sessionMembers) {
      await addSessionMemberToFirestore(session.sessionId, userId);
    }
  } catch (error) {
    log.error('Error saving session to Firestore:', error);
  }
};

export const deleteSessionFromFirestore = async (sessionId: string): Promise<void> => {
  try {
    await firestore().collection('sessions').doc(sessionId).delete();
    log.info(`Session removed from Firestore: ${sessionId}`);
  } catch (error) {
    log.error('Error removing session from Firestore:', error);
  }
};

export const updateSessionInFirestore = async (session: Session): Promise<void> => {
  try {
    await firestore().collection('sessions').doc(session.sessionId).update({
      sessionMembers: session.sessionMembers,
    });
    log.info(`Session updated in Firestore: ${session}`);
  } catch (error) {
    log.error('Error updating session in Firestore:', error);
  }
};

export const addSessionMemberToFirestore = async (sessionId: string, userId: string): Promise<void> => {
  try {
    const sessionDocRef = firestore().collection('sessions').doc(sessionId);

    const sessionDoc = await sessionDocRef.get();
    if (!sessionDoc.exists) {
      await sessionDocRef.set({
        sessionMembers: [],
      });
      log.info(`Session document ${sessionId} created in Firestore with initialized sessionMembers array.`);
    }

    await sessionDocRef.update({
      sessionMembers: firestore.FieldValue.arrayUnion(userId),
    });

    const fcmToken = await getFirebaseToken();
    if (fcmToken) {
      await sessionDocRef.collection('members').doc(userId).set({
        fcmToken: fcmToken,
        userId: userId,
      });
      log.info(`FCM token stored for user ${userId} in session ${sessionId}.`);
    } else {
      log.warn(`FCM token not available for user ${userId}.`);
    }
    log.info(`User ${userId} added to session ${sessionId} in Firestore.`);
  } catch (error) {
    log.error('Error adding session member to Firestore:', error);
  }
};
export const removeSessionMemberFromFirestore = async (sessionId: string, userId: string): Promise<void> => {
  try {
    await firestore()
      .collection('sessions')
      .doc(sessionId)
      .update({
        sessionMembers: firestore.FieldValue.arrayRemove(userId),
      });

    await firestore()
      .collection('sessions')
      .doc(sessionId)
      .collection('members')
      .doc(userId)
      .delete();

    log.info(`User ${userId} removed from session ${sessionId} in Firestore.`);
  } catch (error) {
    log.error('Error removing session member from Firestore:', error);
  }
};