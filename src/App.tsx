import React from 'react'
import Layout from './layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Cart from './pages/cart'
import Products from './pages/products'
import Product from './pages/products/product'
import Order from './pages/order'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<Product />} />
                    <Route path="/order" element={<Order />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
