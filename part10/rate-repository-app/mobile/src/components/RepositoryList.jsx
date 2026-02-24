import { FlatList, View, StyleSheet } from 'react-native'

import RepositoryItem from './RepositoryItem'
import { useEffect, useState } from 'react'

const styles = StyleSheet.create({
    separator: {
        height: 10
    }
})

const repositories = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4'
    }
]

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
    const [repositories, setRepositories] = useState()

    const fetchRepositories = async () => {
        // Replace the IP address part (don't change the port) with your own IP address.
        // You can found it in the logs:
        // ...
        // Metro waiting on exp://10.210.32.165:8081
        // ...
        const response = await fetch(
            'http://10.210.32.165:5000/api/repositories'
        )
        const json = await response.json()

        setRepositories(json)
    }

    useEffect(() => {
        fetchRepositories()
    }, [])

    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : []

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem data={item} />}
        />
    )
}

export default RepositoryList
