import { Image, StyleSheet, View } from 'react-native'

import theme from '../theme'
import RepositoryStat from './RepositoryStat'
import Text from './Text'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: theme.colors.repositoryCard.background
    },
    wrapperContainer: {
        flexDirection: 'row'
    },
    detailsContainer: {
        paddingLeft: 15,
        flex: 1
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    avatar: {
        width: theme.imageSizes.avatar,
        height: theme.imageSizes.avatar,
        borderRadius: theme.imageBorder.borderRadius
    },
    chip: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.text.white,
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start'
    }
})

const RepositoryItem = ({ data }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: data.ownerAvatarUrl }}
                />

                <View style={styles.detailsContainer}>
                    <Text fontWeight="bold" fontSize="heading">
                        {data.fullName}
                    </Text>
                    <Text>{data.description}</Text>

                    <Text style={styles.chip}>{data.language}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <RepositoryStat name="Stars" value={data.stargazersCount} />
                <RepositoryStat name="Forks" value={data.forksCount} />
                <RepositoryStat name="Reviews" value={data.reviewCount} />
                <RepositoryStat name="Rating" value={data.ratingAverage} />
            </View>
        </View>
    )
}

export default RepositoryItem
