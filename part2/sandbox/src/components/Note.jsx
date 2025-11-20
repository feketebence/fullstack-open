const Note = ({ note }) => {
    return <li>{note.important ? <b>{note.content}</b> : note.content}</li>;
};

export default Note;
