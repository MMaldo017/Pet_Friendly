//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './Users.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
        <App />
    </React.StrictMode>
)
