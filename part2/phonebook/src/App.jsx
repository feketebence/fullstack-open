import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    const handleNewNameChange = (event) => setNewName(event.target.value);

    const handleAddPerson = (event) => {
        event.preventDefault();

        const newPerson = {
            name: newName
        };

        setPersons(persons.concat(newPerson));
        setNewName('');
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
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ol>
                {persons.map((person) => (
                    <li key={person.name}>{person.name}</li>
                ))}
            </ol>
        </div>
    );
};

export default App;
