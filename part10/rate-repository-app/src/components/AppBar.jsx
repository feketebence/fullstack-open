import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: theme.colors.appBar
    }
})

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab to="/">Repositories</AppBarTab>
            <AppBarTab to="/sign-in">Sign In</AppBarTab>
        </View>
    )
}

export default AppBar
