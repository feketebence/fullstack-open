import { Divider, List, ListItem, Typography } from '@mui/material'
import { generateId } from '../utils'

const Comments = ({ comments }) => {
    if (comments.length === 0) {
        return <p>This blog does not have any comments</p>
    }

    return (
        <>
            <Typography>Comments ({comments.length}):</Typography>
            <List>
                {comments.map((comment, index) => (
                    <div key={generateId()}>
                        <ListItem
                            key={generateId()}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#b5e0ffff'
                                }
                            }}
                        >
                            <Typography>{comment}</Typography>
                        </ListItem>
                        {index !== comments.length - 1 ? <Divider /> : null}
                    </div>
                ))}
            </List>
        </>
    )
}

export default Comments
