// This makes VSCode check types as if you are using TypeScript
//@ts-check
// import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter
// import ErrorNotification from './ErrorNotification'
// import Construct from './Construct'
import Home from './pages/Home' // Import Home from the pages directory
import './App.css'
import Navbar from './components/Navbar.jsx'
import LoginButton from './components/LoginButton'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import Pets from './Pets/Pets'

// All your environment variables in vite are in this object
console.table(import.meta.env)
const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined') // Update the error message to reflect the change
}

function App() {
    // const [launchInfo, setLaunchInfo] = useState()
    // const [error, setError] = useState(null)

    // useEffect(() => {
    //     async function getData() {
    //         let url = `${API_HOST}/api/launch-details`
    //         console.log('fastapi url: ', url)
    //         let response = await fetch(url)
    //         let data = await response.json()

    //         if (response.ok) {
    //             if (!data.launch_details) {
    //                 console.log('drat! no launch data')
    //                 setError('No launch data')
    //                 return
    //             }
    //             console.log('got launch data!')
    //             setLaunchInfo(data.launch_details)
    //         } else {
    //             console.log('drat! something happened')
    //             setError(data.message)
    //         }
    //     }
    //     getData()
    // }, [])

    // Extract domain from PUBLIC_URL

    return (
        <div>
            <Navbar />
            <Routes>
                <Route element={<LoginButton />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
