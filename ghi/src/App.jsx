// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import Home from './pages/Home' // Import Home from the pages directory
import './App.css'

// All your environment variables in vite are in this object
console.table(import.meta.env)
const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined') // Update the error message to reflect the change
}

function App() {
    const [launchInfo, setLaunchInfo] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            let url = `${API_HOST}/api/launch-details`
            console.log('fastapi url: ', url)
            let response = await fetch(url)
            let data = await response.json()

            if (response.ok) {
                if (!data.launch_details) {
                    console.log('drat! no launch data')
                    setError('No launch data')
                    return
                }
                console.log('got launch data!')
                setLaunchInfo(data.launch_details)
            } else {
                console.log('drat! something happened')
                setError(data.message)
            }
        }
        getData()
    }, [])

    // Extract domain from PUBLIC_URL

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorNotification error={error} />
                <Construct info={launchInfo} />
                <Home /> {/* Add this line */}
            </div>
        </BrowserRouter>
    )
}

export default App
