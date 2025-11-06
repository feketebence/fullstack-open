import { useState } from 'react';

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
    return (
        <>
            {text}: {value} <br />
        </>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const avg = (good - bad) / all;
    const positivePercentage = good / all;

    if (all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Statistics</h1>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <br />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={avg} />
            <StatisticsLine text="positive" value={positivePercentage + ' %'} />
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
