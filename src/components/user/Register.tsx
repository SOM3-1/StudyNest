import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
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

export const Register: React.FC<{ handleSelection: (val: SelectionType) => void }> = ({ handleSelection }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state: AppState) => state.users);
  const dispatch = useDispatch();

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
    setError('');
    if (!fullName || !email || !major || !password) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    if (users.find(user => user.email === email)) {
      setError('Email is already registered');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newUser = { fullName, email, major, password, iD: generateUUID() };
      dispatch(registerUser(newUser));

      // Reset fields after registration
      setFullName('');
      setEmail('');
      setMajor(''); // Reset major to show "Select Major"
      setPassword('');
    } catch (err) {
      setError('An error occurred during registration');
      log.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={registrationStyles.container}>
      <Text style={registrationStyles.header}>User Registeration</Text>

      {error ? <Text style={registrationStyles.errorText}>{error}</Text> : null}

      <View style={registrationStyles.inputContainer}>
        <Icon name="person" size={20} color="#000" style={registrationStyles.icon} />
        <TextInput
          style={registrationStyles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={[registrationStyles.inputContainer, error.includes('Invalid email format') && registrationStyles.errorBorder]}>
        <Icon name="email" size={20} color="#000" style={registrationStyles.icon} />
        <TextInput
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
        <TextInput
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
