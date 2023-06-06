import React from 'react'
import { FC } from 'react'
import './index.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

interface layoutProps {
    children: any
}

const Layout: FC<layoutProps> = ({ children }) => {
    const auth = useAuth0()
    console.log(auth.isAuthenticated)

    return (
        <div className="min-h-screen flex flex-col">
            <header className="py-8 bg-stone-100">
                <div className="container flex flex-row justify-between text-stone-400">
                    <div className="flex flex-row gap-16 items-center uppercase">
                        <Link to={'/'}>home</Link>
                        <Link to={'/products'}>products</Link>
                        <Link to={'/cart'}>cart</Link>
                    </div>
                    {auth.isAuthenticated ? (
                        <div className="flex flex-row gap-8">
                            <label>Hi, {auth.user?.email}</label>
                            <LogoutButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </header>

            <div className="container flex-grow py-8">{children}</div>

            <footer className="bg-stone-100 py-8 text-stone-400">
                <div className="container flex flex-row justify-between items-center">
                    <label>© All Rights Reserved 2023</label>
                </div>
            </footer>
        </div>
    )
}

export default Layout
