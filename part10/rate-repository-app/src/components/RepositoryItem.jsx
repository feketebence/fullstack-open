import { Text, View } from 'react-native'

const RepositoryItem = ({ data }) => {
    return (
        <View>
            <Text>Full name: {data.fullName}</Text>
            <Text>Description: {data.description}</Text>
            <Text>Language: {data.language}</Text>
            <Text>Stars: {data.stargazersCount}</Text>
            <Text>Forks: {data.forksCount}</Text>
            <Text>Reviews: {data.reviewCount}</Text>
            <Text>Rating: {data.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem
