import { Button, Container } from '@mui/material'
import { useState, useImperativeHandle } from 'react'

const Togglable = ({ revealButtonLabel, hideButtonLabel, ref, children }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <Button variant="contained" onClick={toggleVisibility}>
                    {revealButtonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <Button variant="contained" onClick={toggleVisibility}>
                    {hideButtonLabel}
                </Button>
            </div>
        </>
    )
}

export default Togglable
