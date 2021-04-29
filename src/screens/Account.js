import React from 'react';
import { View, Alert, Image, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import useAuth from '../hooks/useAuth';
import logo from '../../assets/logo.png';

export default function Account() {

    const { logout } = useAuth();

    const logoutAccount = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estas seguro de que quieres salir de tu cuenta?',
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: logout
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={logo}
                resizeMode='contain'
            />
            <List.Section>
                <List.Subheader>Configuración</List.Subheader>
                <List.Item
                    title='Cerrar sesión'
                    description='Cierra esta sesión e inicie con otra cuenta'
                    left={(props) => <List.Icon {...props} icon='logout' />}
                    onPress={logoutAccount}
                />
            </List.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        padding: 20
    },
    logo: {
        width: '100%',
        height: 50,
        marginBottom: 20
    }
});
