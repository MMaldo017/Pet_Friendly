import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider baseUrl="http://localhost:8000">
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
