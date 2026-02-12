import { generateId } from '../utils'

const Comments = ({ comments }) => {
    if (comments.length === 0) {
        return <p>This blog does not have any comments</p>
    }

    return (
        <>
            <p>comments:</p>
            <ul>
                {comments.map((comment) => (
                    <li key={generateId()}>{comment}</li>
                ))}
            </ul>
        </>
    )
}

export default Comments
