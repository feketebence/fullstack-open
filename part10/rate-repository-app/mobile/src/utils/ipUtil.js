import Constants from 'expo-constants'

const hostUri = Constants.expoConfig?.hostUri
// Example: "192.168.1.100:8081"

const metroIp = hostUri?.split(':')[0]

export default metroIp
