import Display from './components/Display'
import Button from './components/Button'

const App = () => {
    return (
        <div>
            <Display />
            <div>
                <Button type="INC" label="+" />
                <Button type="ZERO" label="0" />
                <Button type="DEC" label="-" />
            </div>
        </div>
    )
}

export default App
