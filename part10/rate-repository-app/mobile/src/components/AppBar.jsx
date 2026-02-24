import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 20,
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
            <ScrollView horizontal>
                <AppBarTab to="/">Repositories</AppBarTab>
                <AppBarTab to="/sign-in">Sign In</AppBarTab>
            </ScrollView>
        </View>
    )
}

export default AppBar
