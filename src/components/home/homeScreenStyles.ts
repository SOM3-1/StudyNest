import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.offWhite,
  },
  card: {
    backgroundColor: theme.colors.lightBlue,
    borderRadius: 16,
    padding: 8,
    marginBottom: 12,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2, 
    borderColor: theme.colors.bgBlue,
    borderBottomWidth: theme.borderBottom.thick,
    position: 'relative',
  },
  card1: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: theme.colors.bgBlue,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.darkGrey,
    maxWidth: '85%',
  },
  text: {
    fontSize: theme.fontSize.default,
    color: theme.colors.grey,
    marginLeft: 5,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
