import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { AppState } from '@ourtypes/AppState';
import { theme } from 'src/utils/theme';
import { Session } from '@constants/sessions';

export const ViewProfile: React.FC = () => {
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);
  const sessions = useSelector((state: AppState) => state.sessions);

  const getOwnedSessions = (sessions: Session[], userId: string | undefined): Session[] => {
    return sessions.filter(session => session.createdBy === userId);
  };

  const getEnrolledSessions = (sessions: Session[], userId: string | undefined): Session[] => {
    return sessions.filter(session => session.sessionMembers.includes(userId || ''));
  };

  if (!loggedInUser) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No user information available</Text>
      </View>
    );
  }

  const ownedSessions = getOwnedSessions(sessions, loggedInUser.iD);
  const enrolledSessions = getEnrolledSessions(sessions, loggedInUser.iD);

  const initials = loggedInUser.fullName
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <View style={styles.profileIconContainer}>
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${initials}&size=250&background=random` }}
          style={styles.profileIcon}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialIcons name="person" size={24} color={theme.colors.blue} />
          <Text style={styles.infoText}>{loggedInUser.fullName}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="email" size={24} color={theme.colors.blue} />
          <Text style={styles.infoText}>{loggedInUser.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="school" size={24} color={theme.colors.blue} />
          <Text style={styles.infoText}>{loggedInUser.major}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="group" size={24} color={theme.colors.blue} />
          <Text style={styles.statText}>Courses Enrolled: {enrolledSessions.length}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="meeting-room" size={24} color={theme.colors.blue} />
          <Text style={styles.statText}>Sessions Owned: {ownedSessions.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    marginBottom: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.lightGrey,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 0,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  statsContainer: {
    width: '100%',
    marginTop: 0,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
});
