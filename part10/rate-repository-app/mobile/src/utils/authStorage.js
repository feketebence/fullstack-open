import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace
        this.authTokenKeyName = 'accessToken'
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:${this.authTokenKeyName}`
        )
        return accessToken
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:${this.authTokenKeyName}`,
            accessToken
        )
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(
            `${this.namespace}:${this.authTokenKeyName}`
        )
    }
}

export default AuthStorage
