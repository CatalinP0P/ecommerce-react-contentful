import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import FirestoreProvider from './context/FirestoreContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Auth0Provider
        domain="dev-qh18gkcl0jrm1tg7.us.auth0.com"
        clientId="e0PbhJPlsEcM5MqQ7ZJGRNABd6McBVFl"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <FirestoreProvider>
            <App />
        </FirestoreProvider>
    </Auth0Provider>
)
