import { StyleSheet, Dimensions } from "react-native";
import { theme } from "src/utils/theme";

export const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.darkGrey
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  input: {
    height: 40,
    borderColor: theme.colors.grey,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
    color: theme.colors.grey

  },
  pickerContainer: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 40,
    justifyContent: 'center', marginBottom: 10

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },
  activeButton: {
    backgroundColor: theme.colors.blue,
  },
  disabledButton: {
    backgroundColor: theme.colors.grey,
  },
  cancelButton: {
    backgroundColor: theme.colors.grey,
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16, marginLeft: 2,
    marginBottom: 6,
    color: theme.colors.grey
  },
  pickerTextStyle: {
    color: theme.colors.darkGrey
  },
  ownerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 10,
  }, text: {
    fontSize: 16,
    color: theme.colors.darkGrey,
    marginBottom: 10,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leftLabel: {
    fontSize: 16,
    color: theme.colors.grey,
    fontWeight: 'bold',
  },
  rightLabel: {
    fontSize: 16,
    color: theme.colors.grey,
    fontWeight: 'bold',
  },
  leftText: {
    fontSize: 16,
    color: theme.colors.darkGreen,
  },
  rightText: {
    fontSize: 16,
    color: theme.colors.darkGreen,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: theme.colors.red,
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },
  imp: {
    color: theme.colors.red,
  }
});
