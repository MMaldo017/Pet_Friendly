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
import { Provider } from 'react-redux'
import store from './store/store'
import CreatePetForm from './pages/CreatePet'
import AdminPortal from './pages/AdminPortal'

// All your environment variables in vite are in this object
console.table(import.meta.env)
const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined') // Update the error message to reflect the change
}

function App() {
    return (
        <div>
            <Navbar />
            <Provider store={store}>
                <Routes>
                    <Route element={<LoginButton />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/pets/new" element={<CreatePetForm />} />
                    <Route path="/pet-friendly" element={<Home />} />
                    <Route path="/portal" element={<AdminPortal />} />
                </Routes>
            </Provider>
        </div>
    )
}

export default App
