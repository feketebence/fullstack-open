const Hello = (props) => {
    console.log(props);
    return (
        <>
            <p>
                Hello {props.name}, you are {props.age} years old.
            </p>
        </>
    );
};

const App = () => {
    const name = 'Peter';
    const age = 15;

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Joe" age={16} />
            <Hello name={name} age={age + 2} />
        </div>
    );
};

export default App;
