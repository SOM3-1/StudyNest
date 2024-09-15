import React from"react";
import { StyleSheet, Text, View } from "react-native";

export const Home:React.FC = () => {
return (<View style={styles.centeredView}><Text>Hey there</Text></View>)
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  