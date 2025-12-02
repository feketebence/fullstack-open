const Note = ({ note, onToggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important';
    return (
        <li className="note">
            {note.important ? <b>{note.content}</b> : note.content}{' '}
            <button onClick={onToggleImportance}>{label}</button>
        </li>
    );
};

export default Note;
