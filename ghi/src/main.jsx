import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider baseUrl="http://localhost:8000">
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
