import { useEffect } from 'react';
import { useState } from 'react';

import personService from './services/personService';

const Person = ({ name, phoneNumber, onDelete }) => {
    return (
        <li>
            {name} {phoneNumber} <button onClick={onDelete}>Delete</button>
        </li>
    );
};

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
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
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
            const isUpdateConfirmed = window.confirm(
                `${newPerson.name} is already added. Replace the old number with the new one?`
            );
            if (isUpdateConfirmed) {
                const existingPerson = persons.filter(
                    (p) => p.name === newPerson.name
                )[0];

                personService
                    .update(existingPerson.id, newPerson)
                    .then((updatedPerson) => {
                        const nextPersons = persons.map((person) =>
                            person.id === updatedPerson.id
                                ? updatedPerson
                                : person
                        );
                        setPersons(nextPersons);
                    })
                    .catch((error) => {
                        alert(
                            `${existingPerson.name} was already deleted from the server.`
                        );
                        console.log(
                            `Person with id: ${existingPerson.id}, name: ${existingPerson.name}, phoneNumber: ${existingPerson.number} was not found on the server.`,
                            error
                        );

                        const nextPersons = persons.filter(
                            (person) => person.id !== existingPerson.id
                        );
                        setPersons(nextPersons);
                    });
            } else {
                alert(`${newPerson.name} is already added to the phone book.`);
            }
        } else {
            personService.create(newPerson).then((createdPerson) => {
                setPersons(persons.concat(createdPerson));
            });
            setNewName('');
            setNewNumber('');
        }
    };

    const handlePersonDelete = (id) => {
        const personToDelete = persons.find((person) => person.id === id);

        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            const nextPersons = persons.filter((person) => person.id !== id);

            personService.deletePerson(id).then(() => {
                setPersons(nextPersons);
            });
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
            <PersonList
                persons={persons}
                searchText={searchText}
                handlePersonDelete={handlePersonDelete}
            />
        </div>
    );
};

export default App;
