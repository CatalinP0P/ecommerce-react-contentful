import React, { useEffect, useState, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useFirestore } from '../../context/FirestoreContext'
import CartPriceList from '../../components/CartPriceList'
import OrderSuccess from './success'

export default function Order() {
    const firebaseContext = useFirestore()
    const [myCart, setMyCart] = useState<any>([])
    const [fetchedData, setFetchedState] = useState(false)
    const [orderId, setOrderId] = useState<string>('')
    const [orderPlaced, setOrderState] = useState(false)

    const auth = useAuth0()

    // Form States
    const form = useRef<any>()

    const fetchData = async () => {
        const products = await firebaseContext?.getMyCart()
        setMyCart(products)
        setFetchedState(true)
    }

    const sendOrder = async () => {
        const formData = new FormData(form.current)
        const formInputValues = Object.fromEntries(formData.entries())
        firebaseContext
            ?.placeOrder(formInputValues)
            .then((response: string) => {
                setOrderId(response)
                setOrderState(true)
            })
    }

    useEffect(() => {
        if (!auth.isAuthenticated) return
        if (fetchedData) return
        fetchData()
    }, [auth.isAuthenticated])

    return orderPlaced ? (
        <OrderSuccess orderID={orderId} />
    ) : (
        <>
            <h1 className="text-center text-6xl font-light text-stone-400 mt-4 mb-16">
                Place Order
            </h1>
            <CartPriceList myCart={myCart} />
            <form
                className="grid grid-cols-12 gap-4 text-stone-400 font-semibold pt-32"
                ref={form}
            >
                <div className="col-span-6 flex flex-col">
                    <label className="ps-2">First Name</label>
                    <input
                        className={inputStyle}
                        placeholder="First Name"
                        name="firstName"
                    />
                </div>

                <div className="col-span-6 flex flex-col">
                    <label className="ps-2">Last Name</label>
                    <input
                        className={inputStyle}
                        placeholder="Last Name"
                        name="lastName"
                    />
                </div>

                <div className="col-span-4 flex flex-col">
                    <label className="ps-2">Country</label>
                    <input
                        className={inputStyle}
                        placeholder="Country"
                        name="country"
                    />
                </div>

                <div className="col-span-4 flex flex-col">
                    <label className="ps-2">County</label>
                    <input
                        className={inputStyle}
                        placeholder="County"
                        name="county"
                        type="conty"
                    />
                </div>

                <div className="col-span-4 flex flex-col">
                    <label className="ps-2">City</label>
                    <input
                        className={inputStyle}
                        placeholder="City"
                        type="city"
                        name="city"
                    />
                </div>

                <div className="col-span-4 flex flex-col">
                    <label className="ps-2">Email</label>
                    <input
                        className={inputStyle}
                        placeholder="Email"
                        type="email"
                        name="email"
                    />
                </div>

                <div className="col-span-4 flex flex-col">
                    <label className="ps-2">Phone Number</label>
                    <input
                        className={inputStyle}
                        placeholder="Phone number"
                        type="phone"
                        name="phone"
                    />
                </div>

                <div className="col-span-4 flex flex-col">
                    <label className="ps-2">Street, Number</label>
                    <input
                        className={inputStyle}
                        placeholder="Street, number"
                        type="street"
                        name="street"
                    />
                </div>
                <div className="col-span-7 md:col-span-9"></div>
            </form>
            <button
                onClick={sendOrder}
                className="mt-4 col-span-5 md:col-span-3 w-full mx-auto px-8 py-4 text-stone-600 bg-stone-200 rounded-xl hover:text-stone-50 hover:bg-stone-400"
            >
                Send Order
            </button>
        </>
    )
}

const inputStyle = 'p-4 bg-stone-100 text-stone-700 rounded-md'
