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
    },
    input: {
        height: 40,
        borderColor: theme.colors.grey,
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    pickerContainer: {
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    picker: {
        height: 40,
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
        backgroundColor: theme.colors.red,
        padding: 10,
        borderRadius: 8,
        width: '45%',
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
});