const mongoose = require('mongoose')
const Note = require('./models/note')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const dbUser = 'feketebencetyping_db_user'
const appName = 'testNoteApp'
// const url = `mongodb+srv://${dbUser}:${password}@fullstack-open.p2ncusy.mongodb.net/?appName=${appName}`;
const url = `mongodb+srv://${dbUser}:${password}@fullstack-open.p2ncusy.mongodb.net/${appName}?retryWrites=true&w=majority&appName=fullstack-open`
console.log(`Using connection string: ${url}`)

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const note = new Note({
    content: 'I might need a break!',
    important: false
})

note.save().then(() => {
    console.log('note saved!')
    mongoose.connection.close()
})

Note.find({}).then((result) => {
    result.forEach((note) => {
        console.log(note)
    })
    mongoose.connection.close()
})
