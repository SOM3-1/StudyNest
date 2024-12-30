import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@store/appSlice';
import { AppState } from '@ourtypes/AppState';
import { loginStyles } from './loginStyles';
import { SelectionType } from './UserSelection';
import { registrationStyles } from './registrationStyles';
import { log } from '@services/Logger';
import CustomTextInput from 'src/commom/CustomTextInput';

export const Login: React.FC<{ handleSelection: (val: SelectionType) => void }> = ({ handleSelection }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state: AppState) => state.users);

  const isConnnected = useSelector((state: AppState) => state.network.isConnected);
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async () => {

    if (isConnnected) {
      setIsLoading(true);
      setError('');

      if (!email || !password) {
        setError('Email and password are required');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setIsLoading(false);
        return;
      }

      try {
        const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
        if (user) {
          setTimeout(() => {
            dispatch(loginUser({ email, password }));
            ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);

            setError('');
            setIsLoading(false);
          }, 1000);

          setError('');
        } else {
          setTimeout(() => {
            setError('Invalid email or password');
            setIsLoading(false);
          }, 1000)
        }
      } catch (err) {
        setError('An error occurred during login');
        log.error('Login error:', err);
        setIsLoading(false);
      }
    }
    else {
      ToastAndroid.show('Unable to connect to the network!', ToastAndroid.LONG);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.header}>User Login</Text>

      {error ? <Text style={loginStyles.errorText}>{error}</Text> : null}

      <View style={[loginStyles.inputContainer, error.includes('Invalid email format') && loginStyles.errorBorder]}>
        <Icon name="email" size={20} color="#000" style={loginStyles.icon} />
        <CustomTextInput
          style={loginStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onBlur={() => validateEmail(email)}
        />
      </View>

      <View style={loginStyles.inputContainer}>
        <Icon name="lock" size={20} color="#000" style={loginStyles.icon} />
        <CustomTextInput
          style={loginStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[loginStyles.button, (isLoading || !email || password.length < 8) && loginStyles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={loginStyles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={registrationStyles.footerContainer}>
        <Text style={registrationStyles.footerText}>
          No account?{' '}</Text>
        <TouchableOpacity onPress={() => handleSelection(SelectionType.registration)}>
          <Text style={registrationStyles.footerLink}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};