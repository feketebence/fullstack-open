const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return <div>not found...</div>
    }

    return (
        <div>
            <h3>{country.data.name.common} </h3>
            <div>Capital: {country.data.capital} </div>
            <div>Population: {country.data.population}</div>
            <img
                src={country.data.flags.svg}
                height="100"
                alt={`Flag of ${country.data.name.common}`}
            />
        </div>
    )
}

export default Country
