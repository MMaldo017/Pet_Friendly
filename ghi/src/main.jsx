import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Users from './Users.jsx'
import Pets from './Pets/Pets.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
