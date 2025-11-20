import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchText, setSearchText] = useState('');

    const handleNewNameChange = (event) => setNewName(event.target.value);
    const handleNewNumberChange = (event) => setNewNumber(event.target.value);
    const handleSearchTextChange = (event) => setSearchText(event.target.value);

    const handleAddPerson = (event) => {
        event.preventDefault();

        const nextPersonId = Math.max(...persons.map((p) => p.id)) + 1;

        const newPerson = {
            id: nextPersonId,
            name: newName,
            number: newNumber
        };

        const personAlreadyAdded =
            persons.filter((p) => p.name === newPerson.name).length === 0
                ? false
                : true;

        if (personAlreadyAdded) {
            alert(`${newPerson.name} is already added to the phonebook.`);
        } else {
            setPersons(persons.concat(newPerson));
        }

        setNewName('');
        setNewNumber('');
    };

    const personsToShow = persons.filter((person) =>
        person.name.toUpperCase().includes(searchText.toUpperCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            Filter names with:{' '}
            <input
                type="text"
                value={searchText}
                onChange={handleSearchTextChange}
            ></input>
            <br />
            <br />
            <form onSubmit={handleAddPerson}>
                <div>
                    name:{' '}
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNewNameChange}
                    />
                    <br />
                    number:{' '}
                    <input
                        type="text"
                        value={newNumber}
                        onChange={handleNewNumberChange}
                    ></input>
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ol>
                {personsToShow.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default App;
