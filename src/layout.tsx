import React, { useRef, useState } from 'react'
import { FC } from 'react'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import hamburgerMenu from './assets/menu-svgrepo-com.svg'
import { ToastContainer, toast } from 'react-toastify'

interface LayoutProps {
    children: any
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const auth = useAuth0()
    const [menuVisible, setMenu] = useState(false)
    const handleLinkClick = () => {
        setMenu(false)
    }

    return (
        <div className="min-h-screen flex flex-col z-10">
            <header className="py-8 bg-stone-100 z-10">
                {/* Desktop navbar */}
                <div className="hidden container md:flex flex-row justify-between text-stone-400">
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
                {/* Mobile */}
                <div className="container text-stone-400 flex md:hidden">
                    <span
                        className="w-[32px] h-[32px] fill-red-100"
                        onClick={() => setMenu(!menuVisible)}
                    >
                        <img
                            src={hamburgerMenu}
                            className={
                                'transition-all ' +
                                (menuVisible ? 'rotate-90' : 'rotate-0')
                            }
                        ></img>
                    </span>
                </div>
            </header>
            <div
                className={
                    'text-stone-400 bg-stone-100 py-4 px-4 transition-all z-0 uppercase md:translate-y-[-1000%] md:h-0 ' +
                    (menuVisible
                        ? 'translate-y-[0]'
                        : 'translate-y-[-1000%] h-0')
                }
            >
                <div className="container flex flex-col gap-4">
                    <Link
                        to={'/'}
                        className="hover:text-stone-500"
                        onClick={handleLinkClick}
                    >
                        home
                    </Link>
                    <Link
                        to={'/products'}
                        className="hover:text-stone-500"
                        onClick={handleLinkClick}
                    >
                        products
                    </Link>
                    <Link
                        to={'/cart'}
                        className="hover:text-stone-500 uppercase"
                        onClick={handleLinkClick}
                    >
                        cart
                    </Link>
                    {auth.isAuthenticated ? (
                        <>
                            <label className="normal-case cursor-pointer">
                                Hi, {auth.user?.email}
                            </label>
                            <label
                                className="normal-case cursor-pointer"
                                onClick={() => {
                                    auth.logout()
                                }}
                            >
                                LOGOUT
                            </label>
                        </>
                    ) : (
                        <label
                            className="normal-case cursor-pointer"
                            onClick={() => auth.loginWithRedirect()}
                        >
                            LOGIN
                        </label>
                    )}
                </div>
            </div>

            <div className="container flex-grow transition-all">{children}</div>

            <footer className="bg-stone-100 py-8 text-stone-400">
                <div className="container flex flex-row justify-between items-center">
                    <label>© All Rights Reserved 2023</label>
                </div>
            </footer>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    )
}

export default Layout
