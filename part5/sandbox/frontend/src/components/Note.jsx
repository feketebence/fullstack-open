const Note = ({ note, onToggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important'

    const authorUser = note.user ? ' - ' + note.user.username + ' ' : ' '

    return (
        <li className="note">
            {note.important ? <b>{note.content}</b> : note.content}
            <i className="authorName">{authorUser}</i>
            <button onClick={onToggleImportance}>{label}</button>
        </li>
    )
}

export default Note
