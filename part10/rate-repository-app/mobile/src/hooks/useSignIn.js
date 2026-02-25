import { gql, useApolloClient, useMutation } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

const AUTHENTICATE = gql`
    mutation Authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE)
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({
            variables: {
                credentials: {
                    username,
                    password
                }
            }
        })

        console.log('accessToken:', data.authenticate.accessToken)

        // console.log('authStorage:', authStorage)

        // await authStorage.setAccessToken(data.authenticate.accessToken)
        // apolloClient.resetStore()

        return { data }
    }

    return [signIn, result]
}

export default useSignIn
