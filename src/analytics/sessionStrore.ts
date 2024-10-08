import { Session } from '@constants/sessions';
import firestore from '@react-native-firebase/firestore';
import { log } from '@services/Logger';

export const saveSessionToFirestore = async (session: Session): Promise<void> => {
    try {
      await firestore().collection('sessions').doc(session.sessionId).set(session);
      log.info(`Session saved to Firestore: ${session}`);
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
      await firestore()
        .collection('sessions')
        .doc(sessionId)
        .update({
          sessionMembers: firestore.FieldValue.arrayUnion(userId),
        });
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
      log.info(`User ${userId} removed from session ${sessionId} in Firestore.`);
    } catch (error) {
      log.error('Error removing session member from Firestore:', error);
    }
  };