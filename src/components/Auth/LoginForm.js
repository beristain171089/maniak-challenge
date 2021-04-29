import React, { useState } from 'react'
import { StyleSheet, Alert } from 'react-native';
import { TextInput, Button, } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { loginApi } from '../../api/user';
import colors from '../../styles/colors';

export default function LoginForm() {

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({

        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {

            setLoading(true);

            try {

                const response = await loginApi(formData);
                setLoading(false);
                login(response);

            } catch (error) {
                setLoading(false);
                Alert.alert(
                    'Error',
                    'Usuario o contraseña incorrectos',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                )
            }
        }
    });

    return (
        <>
            <TextInput
                label='Email'
                style={styles.input}
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput
                label='Contraseña'
                style={styles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Button
                mode='contained'
                style={styles.btnLogin}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Login
            </Button>
        </>
    )
}

function initialValues() {
    return {
        username: '',
        password: ''
    }
}

function validationSchema() {
    return {
        username: Yup.string().email().required(true),
        password: Yup.string().required(true)
    }
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20
    },
    btnLogin: {
        padding: 5,
        backgroundColor: colors.dark
    },
})