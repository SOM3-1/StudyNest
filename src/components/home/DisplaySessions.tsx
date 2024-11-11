import { Session } from "@constants/sessions";
import { TouchableOpacity, View, Text, FlatList, RefreshControl } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "src/utils/theme";
import { homeScreenStyles } from "./homeScreenStyles";
import { User } from "@ourtypes/AppState";
import { ViewSessionDetails } from "@components/modals/ViewSessionDetails";
import { useCallback, useState } from "react";
import { DateTime } from 'luxon';

interface DisplaySessionsType {
  sessions: Session[],
  loggedInUser: User | undefined
}

export const DisplaySessions: React.FC<DisplaySessionsType> = ({ sessions, loggedInUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  const openModal = (session: Session) => {
    setIsModalVisible(true);
    setCurrentSession(session);
    setIsCreator(session.createdBy === loggedInUser?.iD);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentSession(null);
  };

  const [refreshing, setRefreshing] = useState(false);

  const refreshSessions = useCallback(() => {
    setRefreshing(true); 
    setTimeout(() => {
      setRefreshing(false); 
    }, 2000);
  }, []);

  const renderSessionCard = ({ item }: { item: Session }) => {
    const isOwner = item.createdBy === loggedInUser?.iD;
    const isEnrolled = item.sessionMembers.includes(loggedInUser?.iD || '');
    
    const fromDate = DateTime.fromISO(item.from);
    const toDate = DateTime.fromISO(item.to);
    
    const sameDate = fromDate.toISODate() === toDate.toISODate();
    
    const dateDisplay = sameDate
      ? `${fromDate.toFormat('yyyy-MM-dd')} | ${fromDate.toFormat('HH:mm')} - ${toDate.toFormat('HH:mm')}`
      : `${fromDate.toFormat('yyyy-MM-dd HH:mm')} - ${toDate.toFormat('yyyy-MM-dd HH:mm')}`;

    return (
      <TouchableOpacity onPress={() => openModal(item)} style={homeScreenStyles.card}>
        <View style={homeScreenStyles.card1}>
          <View style={homeScreenStyles.cardHeader}>
            <Text style={homeScreenStyles.sessionTitle} numberOfLines={1} ellipsizeMode="tail">
              {item.sessionTitle}
            </Text>
            {isOwner && (
              <MaterialIcons name="admin-panel-settings" size={24} color={theme.colors.lightGreen} />
            )}
            {isEnrolled && (
              <MaterialIcons name="check-circle" size={24} color={theme.colors.blue} />
            )}
          </View>
          <View style={homeScreenStyles.iconTextRow}>
            <MaterialIcons name="access-time" size={18} color={theme.colors.grey} />
            <Text style={homeScreenStyles.text}> {dateDisplay}</Text>
          </View>
          <View style={homeScreenStyles.iconTextRow}>
            <MaterialIcons name="location-on" size={18} color={theme.colors.grey} />
            <Text style={homeScreenStyles.text}> {item.location} | {item.sessionMembers.length} / {item.participantLimit} Enrolled</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.sessionId}
        renderItem={renderSessionCard}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshSessions} 
          colors={[theme.colors.lightGreen]}
          tintColor={theme.colors.lightGreen} />
        }
      />
      <ViewSessionDetails isVisible={isModalVisible} onClose={closeModal} sessionData={currentSession} isOwner={isCreator} />
    </>
  );
};
