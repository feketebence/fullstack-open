import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'
import metroIp from './ipUtil'

const createApolloClient = () => {
    return new ApolloClient({
        link: new HttpLink({
            uri:
                Constants.expoConfig?.extra?.apollo_uri ||
                `http://${metroIp}:4000/graphql`
        }),
        cache: new InMemoryCache()
    })
}

export default createApolloClient
