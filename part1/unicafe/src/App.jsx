import { useState } from 'react';

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const avg = (good - bad) / all;
    return (
        <div>
            <h1>Statistics</h1>
            good: {good} <br />
            neutral: {neutral} <br />
            bad: {bad} <br />
            <br />
            all: {all} <br />
            average: {avg} <br />
            positive: {good / all} %
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
