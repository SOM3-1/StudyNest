import { homeScreenStyles } from "@components/home/homeScreenStyles"
import React from "react"
import { View, Text } from "react-native"

export const NoSessions:React.FC = () => {
    return ( <View style={homeScreenStyles.noSessionsContainer}>
        <Text style={homeScreenStyles.noSessionsText}>No sessions available</Text>
      </View>)
}   