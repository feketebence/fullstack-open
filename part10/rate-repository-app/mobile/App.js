import { NativeRouter } from 'react-router-native'
import Constants from 'expo-constants'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
import { ApolloProvider } from '@apollo/client'

const apolloClient = createApolloClient()

console.log(`Running the app in ${Constants.expoConfig.extra.env} mode.`)

const App = () => {
    return (
        <NativeRouter
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
            <ApolloProvider client={apolloClient}>
                <Main />
            </ApolloProvider>
        </NativeRouter>
    )
}

export default App
