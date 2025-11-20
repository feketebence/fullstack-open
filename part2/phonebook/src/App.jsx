import { useState } from 'react';

const Entries = ({ persons, filterText }) => {
    const personsToShow = persons.filter((person) =>
        person.name.toUpperCase().includes(filterText.toUpperCase())
    );

    return (
        <>
            <h2>Numbers</h2>
            <ol>
                {personsToShow.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ol>
        </>
    );
};

const NameFilter = ({ searchText, onChange }) => {
    return (
        <>
            Filter names with:{' '}
            <input type="text" value={searchText} onChange={onChange}></input>
        </>
    );
};

const PersonForm = ({
    name,
    onNameChange,
    number,
    onNumberChange,
    onSubmit
}) => {
    return (
        <div>
            <h3>Add new person</h3>
            <form onSubmit={onSubmit}>
                <div>
                    name:{' '}
                    <input type="text" value={name} onChange={onNameChange} />
                    <br />
                    number:{' '}
                    <input
                        type="text"
                        value={number}
                        onChange={onNumberChange}
                    ></input>
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

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

    return (
        <div>
            <h2>Phonebook</h2>
            <NameFilter
                searchText={searchText}
                onChange={handleSearchTextChange}
            />
            <PersonForm
                name={newName}
                onNameChange={handleNewNameChange}
                number={newNumber}
                onNumberChange={handleNewNumberChange}
                onSubmit={handleAddPerson}
            />
            <Entries persons={persons} filterText={searchText} />
        </div>
    );
};

export default App;
