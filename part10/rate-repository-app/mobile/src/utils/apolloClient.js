import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'

import metroIp from './ipUtil'

const httpLink = createHttpLink({
    uri:
        Constants.expoConfig?.extra?.apollo_uri ||
        `http://${metroIp}:4000/graphql`
})

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            // Get the accessToken from the storage and add it to every request
            // if it is present in the AsyncStorage under the `auth:accessToken` key
            const accessToken = await authStorage.getAccessToken()

            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : ''
                }
            }
        } catch (e) {
            console.log(
                'Error in Apollo client while setting auth context and adding accessToken to request: ',
                e
            )

            return {
                headers
            }
        }
    })

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        repositories: relayStylePagination()
                    }
                },
                Repository: {
                    fields: {
                        reviews: relayStylePagination()
                    }
                }
            }
        })
    })
}

export default createApolloClient
