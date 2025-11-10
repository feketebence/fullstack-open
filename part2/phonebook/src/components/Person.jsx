const Person = ({ name, phoneNumber, onDelete }) => {
    return (
        <li>
            {name} {phoneNumber} <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default Person;
