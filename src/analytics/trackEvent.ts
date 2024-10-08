import { Session } from '@constants/sessions';
import analytics from '@react-native-firebase/analytics';
import { log } from '@services/Logger';

export const trackSessionCreation = (session: Session): void => {
    analytics()
      .logEvent('session_created', {
        sessionId: session.sessionId,
        sessionTitle: session.sessionTitle,
        description: session.description,
        date: session.date,
        from: session.from,
        to: session.to,
        location: session.location,
        major: session.major,
        createdBy: session.createdBy,
        participantLimit: session.participantLimit,
        sessionMembers: session.sessionMembers,
      })
      .catch(error => {
        log.error(error);
      });
  };

export const trackSessionJoin = (sessionId: string, userId: string): void => {
  analytics()
    .logEvent('session_joined', {
      sessionId,
      userId,
    })
    .catch(error => {
      log.error(error);
    });
};

export const trackSessionLeave = (sessionId: string, userId: string): void => {
  analytics()
    .logEvent('session_left', {
      sessionId,
      userId,
    })
    .catch(error => {
      log.error(error);
    });
};

export const trackSessionRemoval = (sessionId: string, removedBy: string): void => {
  analytics()
    .logEvent('session_removed', {
      sessionId,
      removedBy,
    })
    .catch(error => {
      log.error(error);
    });
};
