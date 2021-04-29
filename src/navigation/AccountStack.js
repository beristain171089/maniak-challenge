import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';

//Screens
import Account from '../screens/Account';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.Light,
                headerStyle: { backgroundColor: colors.dark },
                cardStyle: {
                    backgroundColor: colors.Light
                }
            }}
        >
            <Stack.Screen
                name='account'
                component={Account}
                options={{
                    title: 'Cuenta'
                }}
            />
        </Stack.Navigator>
    )
}