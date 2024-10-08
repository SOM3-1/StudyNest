import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '@ourtypes/AppState';
import { DisplaySessions } from '@components/home/DisplaySessions';
import { getAvailableSessionsForDashboard } from '@components/helpers/sessionUtils';

export const UserDashBoard: React.FC = () => {
  const sessions = useSelector((state: AppState) => state.sessions);
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);

  if (!loggedInUser) {
    return (
      <View>
        <Text>Please log in to view your dashboard</Text>
      </View>
    );
  }

  const createdSessions = sessions.filter(session => session.createdBy === loggedInUser.iD);
  console.log("createdSessions", createdSessions)

  const joinedSessions = sessions.filter(session => session.sessionMembers.includes(loggedInUser.iD));

  const combinedSessions = [
    ...createdSessions,
    ...joinedSessions.filter(session => !createdSessions.includes(session))
  ];

  const sortedSessions = getAvailableSessionsForDashboard(combinedSessions);
  
  return (
    <>
      {combinedSessions.length > 0 ? (
        <DisplaySessions sessions={sortedSessions} loggedInUser={loggedInUser} />
      ) : (
        <Text>No sessions available</Text> 
      )}
    </>
  );
};
