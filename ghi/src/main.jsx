import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { Provider } from 'react-redux'
    const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider baseUrl={API_HOST}>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
