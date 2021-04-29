import React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import logo from '../../assets/logo.png';
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={logo}
                resizeMode='contain'
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <LoginForm />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    logo: {
        width: '100%',
        height: 50,
        marginBottom: 20
    }
})