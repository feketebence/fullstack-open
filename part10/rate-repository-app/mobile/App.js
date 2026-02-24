import { NativeRouter } from 'react-router-native'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
import { ApolloProvider } from '@apollo/client'

const apolloClient = createApolloClient()

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
