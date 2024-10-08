import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.offWhite, // Use theme color
  },
  card: {
    backgroundColor: theme.colors.white, // Use theme color
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: theme.colors.shadowColor, // Use theme shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2, 
    borderColor: theme.colors.borderGrey, // Outer border
    borderBottomWidth: theme.borderBottom.thick,
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: theme.fontSize.large, // Use theme font size
    fontWeight: theme.fontWeight.bold, // Use theme font weight
    color: theme.colors.darkGrey, // Use theme color
    maxWidth: '85%',
  },
  text: {
    fontSize: theme.fontSize.default, // Use theme font size
    color: theme.colors.grey, // Use theme color
    marginLeft: 5, // To give spacing after the icon
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
