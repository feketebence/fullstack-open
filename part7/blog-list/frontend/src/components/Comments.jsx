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
                    <>
                        <ListItem
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#b5e0ffff'
                                }
                            }}
                            key={generateId()}
                        >
                            <Typography>{comment}</Typography>
                        </ListItem>
                        {index !== comments.length - 1 ? <Divider /> : null}
                    </>
                ))}
            </List>
        </>
    )
}

export default Comments
