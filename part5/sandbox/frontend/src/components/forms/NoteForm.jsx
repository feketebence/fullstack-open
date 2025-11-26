const NoteFrom = ({ onSubmit, handleChange, value }) => {
    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={handleChange} />
                <button type="submit">add note</button>
            </form>
        </div>
    )
}

export default NoteFrom
