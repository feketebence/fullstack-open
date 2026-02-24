import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import metroIp from './ipUtil'

const createApolloClient = () => {
    return new ApolloClient({
        link: new HttpLink({
            uri: `http://${metroIp}:4000/graphql`
        }),
        cache: new InMemoryCache()
    })
}

export default createApolloClient
