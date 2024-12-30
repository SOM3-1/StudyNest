import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@store/appSlice';
import { AppState } from '@ourtypes/AppState';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { generateUUID } from '@components/helpers/uuidGenerator';
import { registrationStyles } from './registrationStyles';
import { SelectionType } from './UserSelection';
import { Picker } from '@react-native-picker/picker';
import { MAJORS } from '@constants/majors';
import { log } from '@services/Logger';
import CustomTextInput from 'src/commom/CustomTextInput';

export const Register: React.FC<{ handleSelection: (val: SelectionType) => void }> = ({ handleSelection }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state: AppState) => state.users);
  const dispatch = useDispatch();

  const isConnnected = useSelector((state: AppState) => state.network.isConnected);

  const validateEmail = (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    if (error === 'Invalid email format') {
      setError('');
    }
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (error === 'Password must be at least 8 characters') {
      setError('');
    }
    return true;
  };

  const handleRegister = async () => {
    if (isConnnected) {
      setIsLoading(true);
      setError('');
      if (!fullName || !email || !major || !password) {
        setError('All fields are required');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email) || !validatePassword(password)) {
        setIsLoading(false);
        return;
      }
      const emailLower = email.toLowerCase();
      if (users.find(user => user.email.toLowerCase() === emailLower)) {
        setError('Email is already registered');
        setIsLoading(false);
        return;
      }


      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newUser = { fullName, email: emailLower, major, password, iD: generateUUID() };
        setTimeout(() => {
          dispatch(registerUser(newUser));
          ToastAndroid.show('User account created successfully!', ToastAndroid.SHORT);

          setFullName('');
          setEmail('');
          setMajor('');
          setPassword('');

        }, 1000)
      } catch (err) {
        setTimeout(() => {
          setError('An error occurred during registration');
          setIsLoading(false);
          log.error('Registration error:', err);
        }, 1000)
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      }
    }
    else {
      ToastAndroid.show('Unable to connect to the network!', ToastAndroid.LONG);
    }
  };

  return (
    <View style={registrationStyles.container}>
      <Text style={registrationStyles.header}>User Registeration</Text>

      {error ? <Text style={registrationStyles.errorText}>{error}</Text> : null}

      <View style={registrationStyles.inputContainer}>
        <Icon name="person" size={20} color="#000" style={registrationStyles.icon} />
        <CustomTextInput
          style={registrationStyles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={[registrationStyles.inputContainer, error.includes('Invalid email format') && registrationStyles.errorBorder]}>
        <Icon name="email" size={20} color="#000" style={registrationStyles.icon} />
        <CustomTextInput
          style={registrationStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onBlur={() => validateEmail(email)}
        />
      </View>

      <View style={registrationStyles.inputContainer}>
        <Icon name="school" size={20} color="#000" style={registrationStyles.icon} />
        <Picker
          selectedValue={major}
          onValueChange={(itemValue) => {
            setMajor(itemValue);
          }}
          style={registrationStyles.input}
        >
          {MAJORS.map((major) => (
            <Picker.Item key={major.value} label={major.label} value={major.value} />
          ))}
        </Picker>
      </View>


      <View style={[registrationStyles.inputContainer, error.includes('Password must be at least 8 characters') && registrationStyles.errorBorder]}>
        <Icon name="lock" size={20} color="#000" style={registrationStyles.icon} />
        <CustomTextInput
          style={registrationStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onBlur={() => validatePassword(password)}
        />
      </View>

      <TouchableOpacity
        style={[registrationStyles.button, isLoading && registrationStyles.disabledButton]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={registrationStyles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <View style={registrationStyles.footerContainer}>
        <Text style={registrationStyles.footerText}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => handleSelection(SelectionType.login)}>
          <Text style={registrationStyles.footerLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
