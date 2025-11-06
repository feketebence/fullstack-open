import { useState } from 'react';

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const App = () => {
    const [value, setValue] = useState(10);

    const setToValue = (newValue) => {
        console.log('value changes from', value, 'to: ', newValue);
        setValue(newValue);
    };

    return (
        <div>
            <Display text={value} />
            <Button onClick={() => setToValue(0)} text="reset to zero" />
            <Button onClick={() => setToValue(10)} text="set to 10" />
            <Button onClick={() => setToValue(value + 1)} text="increment" />
        </div>
    );
};

export default App;
