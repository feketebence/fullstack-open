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
