import { useState } from 'react';

const Display = ({ counter }) => <h2>{counter}</h2>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
    const [counter, setCounter] = useState(0);

    const increaseByOne = () => setCounter(counter + 1);
    const decreaseByOne = () => setCounter(counter - 1);
    const resetToZero = () => setCounter(0);

    return (
        <>
            <Display counter={counter} />
            <div>
                <Button text="+1" onClick={increaseByOne} />
                <Button text="-1" onClick={decreaseByOne} />
                <Button text="Reset to 0" onClick={resetToZero} />
            </div>
        </>
    );
};

export default App;
