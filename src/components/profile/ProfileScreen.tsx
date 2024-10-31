import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ToastAndroid, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from 'src/utils/theme';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@store/appSlice';
import { homeScreenStyles } from '@components/home/homeScreenStyles';

export const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            dispatch(logoutUser());

            ToastAndroid.show('Successfully logged out', ToastAndroid.SHORT);

            setIsLoading(false);

        }, 2000);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ViewProfile')}>
                <MaterialIcons name="person" size={24} color={theme.colors.blue} />
                <Text style={styles.text}>View Profile</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity style={styles.item}>
                <MaterialIcons name="settings" size={24} color={theme.colors.blue} />
                <Text style={styles.text}>Account Settings</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity style={styles.item} onPress={handleLogOut}>
                <MaterialIcons name="logout" size={24} color={theme.colors.blue} />
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
            {isLoading && <View style={homeScreenStyles.overlay}>
                <ActivityIndicator size={80} color={theme.colors.lightBlue} />
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    text: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
    },
});
