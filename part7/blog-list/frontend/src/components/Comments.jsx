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
                {comments.map((comment) => (
                    <>
                        <ListItem
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#b5e0ffff'
                                }
                            }}
                            key={generateId()}
                        >
                            {comment}
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </>
    )
}

export default Comments
