import Person from './Person';

const PersonList = ({ persons, searchText, handlePersonDelete }) => {
    const personsToShow = persons.filter((p) => {
        return p.name.toUpperCase().includes(searchText.toUpperCase());
    });

    return (
        <>
            <h2>Numbers</h2>
            <ol>
                {personsToShow.map((person) => (
                    <Person
                        key={person.id}
                        name={person.name}
                        phoneNumber={person.number}
                        onDelete={() => handlePersonDelete(person.id)}
                    />
                ))}
            </ol>
        </>
    );
};

export default PersonList;
