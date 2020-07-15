import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { getPushNotificationPermissions } from '../services/notification';

interface User {
  id: string;
  full_name: string;
  email: string;
  balance: number;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  updateBalance(amount: number): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const interceptorUnauthorized = () => {
    api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          signOut();
        }

        return Promise.reject(error);
      },
    );
  };

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBank:token',
        '@GoBank:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        interceptorUnauthorized();

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@GoBank:token', token],
        ['@GoBank:user', JSON.stringify(user)],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      interceptorUnauthorized();
      getPushNotificationPermissions();

      setData({ token, user });
    } catch (error) {
      if (error.response?.data) {
        Alert.alert(
          'Oopss...',
          error.response?.data.message || 'Something went wrong.',
        );
        throw new Error(error.response);
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBank:token', '@GoBank:user']);

    setData({} as AuthState);
  }, []);

  const updateBalance = useCallback(async (amount: number) => {
    const updatedUser = data.user;
    if (updatedUser) {
      updatedUser.balance = amount;

      await AsyncStorage.setItem('@GoBank:user', JSON.stringify(updatedUser));

      setData({ token: data.token, user: updatedUser });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
