import { useEffect, useState } from 'react'
import axios from 'axios'

const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const fetchData = async (name) => {
        const response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        return response.data
    }

    useEffect(() => {
        console.log('useEffect inside useCountry hook is called')

        if (name !== '') {
            fetchData(name)
                .then((response) => {
                    console.log('response:', response)
                    console.log('setCountry will be called')

                    setCountry({ found: true, data: response })
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setCountry({ found: false })
                    } else {
                        console.log(
                            `Error while fetching ${name} country`,
                            error
                        )
                    }
                })
        }
    }, [name])

    return country
}

export default useCountry
