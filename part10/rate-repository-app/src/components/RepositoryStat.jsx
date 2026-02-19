import { StyleSheet, View } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})

const formatToThousands = (input) => {
    const rounded = Math.round(input / 100) / 10 // 1 decimal precision
    return rounded % 1 === 0 ? `${rounded}k` : `${rounded.toFixed(1)}k`
}

const RepositoryStat = ({ name, value }) => {
    return (
        <View style={styles.container}>
            <Text fontWeight="bold" fontSize="subheading">
                {value > 1000 ? formatToThousands(value) : value}
            </Text>
            <Text>{name}</Text>
        </View>
    )
}

export default RepositoryStat
