import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '234-2341-2134' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNewNameChange = (event) => setNewName(event.target.value);
    const handleNewNumberChange = (event) => setNewNumber(event.target.value);

    const handleAddPerson = (event) => {
        event.preventDefault();

        const newPerson = {
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
                {persons.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default App;
