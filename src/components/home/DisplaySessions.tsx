import { Session } from "@constants/sessions";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "src/utils/theme";
import { homeScreenStyles } from "./homeScreenStyles";
import { useSelector } from "react-redux";
import { AppState, User } from "@ourtypes/AppState";

interface DisplaySessionsType {
  sessions: Session[],
  loggedInUser: User | undefined
}
export const DisplaySessions: React.FC<DisplaySessionsType> = ({ sessions, loggedInUser }) => {

  const handleSessionClick = (session: any) => {
    console.log('Session clicked:', session);
  };

  const renderSessionCard = ({ item }: { item: Session }) => {
    const isOwner = item.createdBy === loggedInUser?.iD;

    return (
      <TouchableOpacity onPress={() => handleSessionClick(item)} style={homeScreenStyles.card}>
        <View style={homeScreenStyles.card1}>
          <View style={homeScreenStyles.cardHeader}>
            <Text style={homeScreenStyles.sessionTitle} numberOfLines={1} ellipsizeMode="tail">
              {item.sessionTitle}
            </Text>
            {isOwner && (
              <MaterialIcons name="admin-panel-settings" size={24} color={theme.colors.primary} />
            )}
          </View>
          <View style={homeScreenStyles.iconTextRow}>
            <MaterialIcons name="access-time" size={18} color={theme.colors.grey} />
            <Text style={homeScreenStyles.text}> {item.from} - {item.to} | {item.date}</Text>
          </View>

          <View style={homeScreenStyles.iconTextRow}>
            <MaterialIcons name="location-on" size={18} color={theme.colors.grey} />
            <Text style={homeScreenStyles.text}> {item.location} | {item.sessionMembers.length} / {item.participantLimit} Enrolled</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (<FlatList
      data={sessions}
      keyExtractor={(item) => item.sessionId}
      renderItem={renderSessionCard}
    />)
}