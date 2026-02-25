import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { useFormik } from 'formik'
import { object, string } from 'yup'

import Text from './Text'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import useAuthStorage from '../hooks/useAuthStorage' // needed only for debugging

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = object().shape({
    username: string().required('Username is required'),
    password: string().required('Password is required')
})

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.panelBackground
    },
    input: {
        width: '100%',
        padding: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: theme.colors.light,
        borderRadius: 5
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
    },
    errorMessage: {
        paddingBottom: 10,
        color: theme.colors.text.error
    }
})

const SignInForm = () => {
    const [signIn] = useSignIn()
    const authStorage = useAuthStorage() // needed only for debugging

    const onSubmit = async (values) => {
        console.log(
            `Attempting login with username '${values.username}' and password '${values.password}'`
        )
        const { username, password } = values

        try {
            const { data } = await signIn({ username, password })
            console.log(
                'Successful login, accessToken:',
                data.authenticate.accessToken
            )
        } catch (e) {
            console.log('Error during login:', e)
        }
    }

    // needed only for debugging
    const logAuthStorage = async () => {
        const authStorageToken = await authStorage.getAccessToken()
        console.log('AuthStorage[auth:accessToken]:', authStorageToken)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return (
        <View style={styles.container}>
            <TextInput
                style={
                    formik.touched.username && formik.errors.username
                        ? { ...styles.input, borderColor: '#d73a4a' }
                        : styles.input
                }
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorMessage}>
                    {formik.errors.username}
                </Text>
            )}

            <TextInput
                style={
                    formik.touched.password && formik.errors.password
                        ? { ...styles.input, borderColor: '#d73a4a' }
                        : styles.input
                }
                placeholder="Password"
                secureTextEntry
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorMessage}>
                    {formik.errors.password}
                </Text>
            )}

            <Pressable
                style={styles.submitButton}
                onPress={formik.handleSubmit}
            >
                <Text fontSize="subheading" fontWeight="bold" color="light">
                    Sign in
                </Text>
            </Pressable>

            {/* // needed only for debugging */}
            <Pressable style={styles.submitButton} onPress={logAuthStorage}>
                <Text fontSize="subheading" fontWeight="bold" color="light">
                    Log AuthStorage[auth:accessToken] to console
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
