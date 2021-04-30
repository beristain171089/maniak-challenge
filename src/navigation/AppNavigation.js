import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

//Screens
import HomeStack from './HomeStack';
import AccountStack from './AccountStack';
import colors from '../styles/colors';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        return setIcon(route)
                    }
                })}
            >
                <Tab.Screen
                    name='home'
                    component={HomeStack}
                    options={{
                        title: 'Inicio'
                    }}
                />
                <Tab.Screen
                    name='account'
                    component={AccountStack}
                    options={{
                        title: 'Cuenta'
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function setIcon(route) {

    let iconName = '';

    switch (route.name) {
        case 'home':
            iconName = 'home'
            break;
        case 'account':
            iconName = 'user'
            break;
        default:
            break;
    }

    return <AwesomeIcon name={iconName} style={styles.icon} />
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.dark
    },
    icon: {
        fontSize: 20,
        color: colors.Light
    }
})