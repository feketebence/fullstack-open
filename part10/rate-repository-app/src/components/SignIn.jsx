import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { useFormik } from 'formik'

import Text from './Text'
import theme from '../theme'

const initialValues = {
    username: '',
    password: ''
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.panelBackground
    },
    input: {
        width: '100%',
        padding: 5,
        borderWidth: 1,
        borderColor: theme.colors.light,
        borderRadius: 5,
        margin: 5
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        width: '100%',
        padding: 5,
        borderWidth: 1,
        borderColor: theme.colors.light,
        borderRadius: 5,
        margin: 5
    }
})

const SignInForm = () => {
    const onSubmit = (values) => {
        console.log(
            `user attempted login with username '${values.username}' and password '${values.password}'`
        )
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            <Pressable
                style={styles.submitButton}
                onPress={formik.handleSubmit}
            >
                <Text fontSize="subheading" fontWeight="bold" color="light">
                    Sign in
                </Text>
            </Pressable>
        </View>
    )
}

const SignIn = () => {
    return (
        <>
            <SignInForm />
        </>
    )
}

export default SignIn
