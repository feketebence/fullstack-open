const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('Connecting to:', url);
mongoose
    .connect(url, { family: 4 })
    .then((result) => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (value) => {
                return /^\d{2,3}-\d*$/.test(value);
            },
            message: (props) =>
                `'${props.value}' is not a valid phone number. It should be formed of two parts that are separated by '-'. The first part has two or three numbers and the second part also consists of numbers. E.g: 09-1234556 or 040-22334455`
        },
        required: [true, 'User phone number is required']
    }
});

// Enable validation on all update operations
personSchema.set('runValidators', true);
personSchema.set('context', 'query');

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);
