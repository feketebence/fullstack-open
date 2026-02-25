import { NativeRouter } from 'react-router-native'
import Constants from 'expo-constants'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
import { ApolloProvider } from '@apollo/client'
import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'

console.log(`Running the app in ${Constants.expoConfig.extra.env} mode.`)
console.log(`Using apollo_uri: ${Constants.expoConfig.extra.apollo_uri}`)

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
    return (
        <NativeRouter
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
            <ApolloProvider client={apolloClient}>
                <AuthStorageContext.Provider value={authStorage}>
                    <Main />
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </NativeRouter>
    )
}

export default App
