const PersonForm = ({
    name,
    onNameChange,
    number,
    onNumberChange,
    onSubmit
}) => {
    return (
        <div>
            <h3>Add new person</h3>
            <form onSubmit={onSubmit}>
                <div>
                    name:{' '}
                    <input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        name="name"
                        autoComplete="off"
                    />
                    <br />
                    number:{' '}
                    <input
                        type="text"
                        value={number}
                        onChange={onNumberChange}
                        name="number"
                    ></input>
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;
