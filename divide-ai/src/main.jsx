import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId='823491690532-81b0v1ffin4kvvmb0jlpn51dvlivcjq1.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
)
