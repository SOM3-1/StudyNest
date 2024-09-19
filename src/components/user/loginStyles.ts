import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 20,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#6c757d',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
    errorBorder: {
      borderBottomColor: 'red',
    },
    footerContainer: {
        marginTop: 20,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontSize: 16,
        color: '#000',
      },
      footerLinkContainer: {
        backgroundColor: 'transparent', 
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
      },
      footerLink: {
        fontSize: 16,
        color: '#1E90FF',
        textDecorationLine: 'underline',
      },
  });
  