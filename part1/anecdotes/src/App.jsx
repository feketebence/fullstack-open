import { useState } from 'react';

const getRandomInt = (upperLimit) => Math.floor(Math.random() * upperLimit);

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
];

const Anecdote = ({ content, voteCount }) => {
    return (
        <>
            <p>{content}</p>
            <p>This anecdote has {voteCount} votes.</p>
        </>
    );
};

const App = () => {
    const handleVoteClick = () => {
        let nextVotes = [...votes];
        nextVotes[selected] += 1;

        setVotes(nextVotes);
    };

    const handleNextClick = () => setSelected(getRandomInt(anecdotes.length));

    let initialVotes = Array(anecdotes.length).fill(0);
    const [votes, setVotes] = useState(initialVotes);
    const [selected, setSelected] = useState(0);

    const maxVoteIndex = votes.indexOf(Math.max(...votes));

    const voteHappened = Math.max(...votes) === 0 ? false : true;

    return (
        <div>
            <h1>Anecdote of the day</h1>

            <Anecdote
                content={anecdotes[selected]}
                voteCount={votes[selected]}
            />

            <button onClick={handleNextClick}>next anecdote</button>
            <button onClick={handleVoteClick}>Vote</button>

            {voteHappened && (
                <>
                    <h1>Anecdote with the most votes</h1>
                    <Anecdote
                        content={anecdotes[maxVoteIndex]}
                        voteCount={votes[maxVoteIndex]}
                    />
                </>
            )}
        </div>
    );
};

export default App;
