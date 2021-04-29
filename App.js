import React, { useState, useEffect, useMemo } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
import Login from './src/screens/Login';
import AuthContext from './src/context/AuthContext';
import { getTokenApi, setTokenApi, removeTokenApi } from './src/api/token';
import { View, ActivityIndicator } from 'react-native';

export default function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {

    (async () => {

      const token = await getTokenApi();

      if (token) {

        setAuth({ token });

      } else {
        setAuth(null);
      }

    })()

  }, []);

  const login = (data) => {

    setTokenApi(data.token);

    setAuth({ token: data.token });

  }

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout
    }),
    [auth]
  );

  if (auth === undefined)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ?
          <AppNavigation />
          :
          <Login />
        }
      </PaperProvider>
    </AuthContext.Provider>
  );
}