import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'

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
            <AppBarTab>Repositories</AppBarTab>
            <AppBarTab>Something</AppBarTab>
        </View>
    )
}

export default AppBar
