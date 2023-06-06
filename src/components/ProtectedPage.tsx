import React, { FC } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { isatty } from 'tty'
import LoginButton from './LoginButton'

interface ProtectedPageProps {
    children: any
}

const ProtectedPage: FC<ProtectedPageProps> = ({ children }) => {
    const auth = useAuth0()
    const { isAuthenticated, loginWithRedirect } = auth
    if (!isAuthenticated) {
        loginWithRedirect()
        return null
    }

    return <>{children}</>
}

export default ProtectedPage
