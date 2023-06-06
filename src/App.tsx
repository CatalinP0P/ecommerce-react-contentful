import React from 'react'
import Layout from './layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Cart from './pages/cart'
import Products from './pages/products'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
