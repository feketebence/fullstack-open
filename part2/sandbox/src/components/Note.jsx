const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important';
    return (
        <li>
            {note.important ? <b>{note.content}</b> : note.content}{' '}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    );
};

export default Note;
