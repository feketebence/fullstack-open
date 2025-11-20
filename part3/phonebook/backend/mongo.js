const mongoose = require('mongoose');

let operation = '';

if (process.argv.length < 3) {
    console.log('give password as first argument');
    process.exit(1);
} else if (process.argv.length === 3) {
    operation = 'readAll';
    console.log(`Operation: ${operation}`);
} else if (process.argv.length === 5) {
    operation = 'save';
    console.log('Operation: save');
} else {
    console.log('Invalid number of arguments.');
    process.exit(2);
}

const password = process.argv[2];

const dbUser = 'feketebencetyping_db_user';
const appName = 'phonebookConsoleApp';
const url = `mongodb+srv://${dbUser}:${password}@fullstack-open.p2ncusy.mongodb.net/${appName}?retryWrites=true&w=majority&appName=fullstack-open`;
console.log(`Using connection string: ${url}`);

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if (operation === 'save') {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    newPerson
        .save()
        .then((result) => {
            console.log('New person saved to the phonebook');
        })
        .finally(() => {
            mongoose.connection.close();
        });
} else if (operation === 'readAll') {
    Person.find({})
        .then((result) => {
            result.forEach((person) => {
                console.log(person);
            });
        })
        .finally(() => {
            mongoose.connection.close();
        });
} else {
    console.log(`Unknown operation: ${operation}`);
    console.log('Exiting...');
    process.exit(3);
}
// const note = new Note({
//     content: 'DMX Krew makes really good sounds!',
//     important: true
// });

// note.save().then((result) => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

// Note.find({}).then((result) => {
//     result.forEach((note) => {
//         console.log(note);
//     });
//     mongoose.connection.close();
// });
