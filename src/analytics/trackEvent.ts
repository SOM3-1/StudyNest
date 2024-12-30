import { Session } from '@constants/sessions';
import analytics from '@react-native-firebase/analytics';
import { log } from '@services/Logger';
import { addSessionMemberToFirestore, deleteSessionFromFirestore, removeSessionMemberFromFirestore, saveSessionToFirestore, saveUserRegistration } from './sessionStrore';
import { User } from '@ourtypes/AppState';

export const trackSessionCreation = (session: Session, fullName: string): void => {
    analytics()
      .logEvent('session_created', {
        sessionId: session.sessionId,
        sessionTitle: session.sessionTitle,
        description: session.description,
        from: session.from,
        to: session.to,
        location: session.location,
        major: session.major,
        createdById: session.createdBy,
        participantLimit: session.participantLimit,
        sessionMembers: session.sessionMembers,
        fullName
      })
      .catch(error => {
        log.error(error);
      });
      saveSessionToFirestore(session)
  };

export const trackSessionJoin = (sessionId: string, userId: string, fullName: string): void => {
  analytics()
    .logEvent('session_joined', {
      sessionId,
      userId,
      fullName
    })
    .catch(error => {
      log.error(error);
    });
    addSessionMemberToFirestore(sessionId, userId);
};

export const trackSessionLeave = (sessionId: string, userId: string, fullName: string): void => {
  analytics()
    .logEvent('session_left', {
      sessionId,
      userId,
      fullName
    })
    .catch(error => {
      log.error(error);
    });
    removeSessionMemberFromFirestore(sessionId, userId);
};

export const trackSessionRemoval = (sessionId: string, removedBy: string, fullName: string): void => {
  analytics()
    .logEvent('session_removed', {
      sessionId,
      removedBy,
      fullName
    })
    .catch(error => {
      log.error(error);
    });
    deleteSessionFromFirestore(sessionId)
};

export const trackUserRegistration = async (user: User): Promise<void> => {
  try {
    await analytics().logEvent('user_registered', {
      userId: user.iD,
      fullName: user.fullName,
      email: user.email,
      major: user.major,
    });
    saveUserRegistration(user)
  } catch (error) {
    log.error('Error tracking user registration or saving to Firestore:', error);
  }
};