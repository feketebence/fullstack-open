import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'

import Text from './Text'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10
    }
})

const AppBarTab = ({ children, to }) => {
    const navigate = useNavigate()

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigate(to)}>
                <Text fontSize="heading" color="light">
                    {children}
                </Text>
            </Pressable>
        </View>
    )
}

export default AppBarTab
