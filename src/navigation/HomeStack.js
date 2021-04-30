import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';

//Screens
import Home from '../screens/Home';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.dark,
                cardStyle: {
                   backgroundColor: colors.Light
                }
            }}
        >
            <Stack.Screen
                name='home'
                component={Home}
                options={{
                    title: 'Inicio',
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
