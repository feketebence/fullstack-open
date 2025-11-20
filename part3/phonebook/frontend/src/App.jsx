import { useEffect } from 'react';
import { useState } from 'react';

import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import NameFilter from './components/NameFilter';

import personService from './services/personService';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchText, setSearchText] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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

                        setSuccessMessage(
                            `Person "${updatedPerson.name}" updated.`
                        );
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 3000);
                    })
                    .catch((error) => {
                        console.log('error:', error);

                        console.log(
                            `Person with id: ${existingPerson.id}, name: ${existingPerson.name}, phoneNumber: ${existingPerson.number} was not found on the server.`,
                            error
                        );

                        const nextPersons = persons.filter(
                            (person) => person.id !== existingPerson.id
                        );
                        setPersons(nextPersons);

                        setErrorMessage(
                            `${existingPerson.name} was already deleted from the server.`
                        );
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
            } else {
                alert(`${newPerson.name} is already added to the phone book.`);
            }
        } else {
            personService
                .create(newPerson)
                .then((createdPerson) => {
                    setPersons(persons.concat(createdPerson));
                    setSuccessMessage(`Person "${newPerson.name}" added.`);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(
                        'error from backend: ',
                        error.response.data.error
                    );

                    setErrorMessage(error.response.data.error);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
            setNewName('');
            setNewNumber('');
        }
    };

    const handlePersonDelete = (id) => {
        const personToDelete = persons.find((person) => person.id === id);

        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            const nextPersons = persons.filter((person) => person.id !== id);

            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(nextPersons);

                    setSuccessMessage(
                        `Person "${personToDelete.name}" deleted.`
                    );
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                })
                .catch((error) => {
                    console.log('Error:', error);
                    setErrorMessage(
                        `Person "${personToDelete.name}" has already been deleted from the server.`
                    );
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                    const nextPersons = persons.filter(
                        (person) => person.id !== id
                    );
                    setPersons(nextPersons);
                });
        }
    };

    return (
        <div>
            <h2>Phone book</h2>
            <SuccessNotification message={successMessage} />
            <ErrorNotification message={errorMessage} />
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
