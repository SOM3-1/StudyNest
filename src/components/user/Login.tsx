import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@store/appSilce';
import { AppState } from '@ourtypes/AppState';
import { loginStyles } from './loginStyles';
import { SelectionType } from './UserSelection';
import { registrationStyles } from './registrationStyles';

export const Login: React.FC<{ handleSelection: (val: SelectionType) => void }> = ({ handleSelection }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state: AppState) => state.users);
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
    } else {
      setError(prev => prev === 'Invalid email format' ? '' : prev);
    }
  };

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    validateEmail(email);

    if (error) return;

    setIsLoading(true);

    try {
      console.log(users)
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        dispatch(loginUser({ email, password }));
        setError('');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.header}>Login</Text>

      {error ? <Text style={loginStyles.errorText}>{error}</Text> : null}

      <View style={[loginStyles.inputContainer, error.includes('Invalid email format') && loginStyles.errorBorder]}>
        <Icon name="email" size={20} color="#000" style={loginStyles.icon} />
        <TextInput
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
        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[loginStyles.button, (isLoading || !email || !password) && loginStyles.disabledButton]}
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

