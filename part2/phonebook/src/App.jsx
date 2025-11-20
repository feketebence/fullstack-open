import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

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
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            console.log('JSON response arrived from server');
            setPersons(response.data);
        });
    }, []);

    const handleNewNameChange = (event) => setNewName(event.target.value);
    const handleNewNumberChange = (event) => setNewNumber(event.target.value);
    const handleSearchTextChange = (event) => setSearchText(event.target.value);

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
            alert(`${newPerson.name} is already added to the phone book.`);
        } else {
            axios
                .post('http://localhost:3001/persons', newPerson)
                .then((response) => {
                    console.log('response:', response);
                    const createdPerson = response.data;
                    setPersons(persons.concat(createdPerson));
                });
            setNewName('');
            setNewNumber('');
        }
    };

    return (
        <div>
            <h2>Phone book</h2>
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
