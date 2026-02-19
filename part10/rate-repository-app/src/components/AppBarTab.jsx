import { Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10
    }
})

const handlePress = (children) => {
    console.log(`${children} tab pressed`)
}

const AppBarTab = ({ children }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => handlePress(children)}>
                <Text fontSize="heading" color="light">
                    {children}
                </Text>
            </Pressable>
        </View>
    )
}

export default AppBarTab
