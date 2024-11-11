import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.white,
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
    color: theme.colors.darkGreen,
    marginLeft: 5,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 8,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.bgBlue,
  },
  input: { 
    flex: 1, 
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.offWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    marginRight: 10,
    color: theme.colors.black
  }, 
  clearButton: {
    alignSelf: 'center', 
    height: 40
  },
  clearButtonText: {
    textDecorationLine: 'underline',
    color: theme.colors.blue,  
    fontWeight: 'bold',
    fontSize: 16,
  },
  highlightedButton: {
    color: theme.colors.accent, 
  },
  noSessionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSessionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.tealGrey,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.blue,
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.blue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.lightBlue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay : {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
    width: '100%',
    height: '100%'
}
});
