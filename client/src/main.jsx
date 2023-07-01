import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalContext'
import App from './App'

import './styles/base.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>
)
