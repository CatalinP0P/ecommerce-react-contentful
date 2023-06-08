import React, { useEffect, useState } from 'react'
import ProtectedPage from '../../components/ProtectedPage'
import app from '../../lib/firebase'
import { useFirestore } from '../../context/FirestoreContext'
import { toast } from 'react-toastify'
import client from '../../lib/contentful'
import { isQualifiedName, setTokenSourceMapRange } from 'typescript'
import { useAuth0 } from '@auth0/auth0-react'
import { privateDecrypt } from 'crypto'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
    const [products, setProducts] = useState<any>([])
    const [total, setTotal] = useState<number>()
    const firestoreContext = useFirestore()
    const firestore = app.firestore()

    const cartCollection = firestore.collection('Cart')
    const auth = useAuth0()

    const removeFromCart = async (docID: string) => {
        const response = await firestoreContext?.removeFromCart(docID)
        toast.success('Removed')
        fetchData()
    }

    const fetchData = async () => {
        const myCart = await firestoreContext?.getMyCart()
        var total = 0
        myCart.forEach((x: any) => {
            total += x.quantity * x.price
        })
        setTotal(total)
        setProducts(myCart)
    }

    useEffect(() => {
        if (auth.isAuthenticated == true) fetchData()
    }, [auth.isAuthenticated])

    return (
        <ProtectedPage>
            <h1 className="text-center text-6xl text-stone-400 font-extralight">
                Cart
            </h1>
            <div className="flex flex-col gap-4 py-20 lg:w-[75%] xl:w-[60%] mx-auto">
                {products.map((product: any) => {
                    return (
                        <div
                            key={product.productID}
                            className="flex flex-row bg-stone-100 rounded-md p-2 justify-between transition-none"
                        >
                            <div className="h-full w-full flex flex-row gap-8">
                                <img
                                    src={product.picture}
                                    className="w-[40%] h-[40%] md:w-[30%] md:h-[30%] 2xl:w-[25%] 2xl:h-[25%]"
                                />
                                <div className="flex flex-col justify-around">
                                    <label className="text-2xl lg:text-3xl text-stone-400 font-bold uppercase">
                                        {product.title}
                                    </label>
                                    <label className="text-xl text-stone-300">
                                        Quantity:
                                        <span className="text-2xl text-stone-400">
                                            {product.quantity}
                                        </span>
                                    </label>
                                    <label className="text-3xl ld:text-6xl text-stone-500 font-extrabold md:items-center flex flex-col md:flex-row md:gap-4">
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                        €
                                        <span
                                            className={
                                                product.quantity > 1
                                                    ? 'text-stone-400 font-light text-xl'
                                                    : 'hidden'
                                            }
                                        >
                                            {' '}
                                            ({product.quantity} x{' '}
                                            {product.price})
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="relative right-0 px-8 py-4 m-2 md:m-8 text-stone-400 bg-stone-200 rounded-md my-auto hover:bg-stone-300 hover:text-stone-50 transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    )
                })}
                <hr className="mt-8" />
                <div className="justify-between flex flex-row items-center">
                    <label className="text-2xl font-light text-stone-400">
                        Total:{' '}
                        <span className="text-3xl font-bold text-stone-500">
                            {total?.toFixed(2)}€
                        </span>
                    </label>
                    <Link
                        to={'/order'}
                        className={"px-8 py-4 bg-stone-100 text-stone-400 hover:bg-stone-200 hover:text-stone-50 transition-all rounded-xl " + (total == 0 ? "hidden" : "")}
                    >
                        Finalize Order
                    </Link>
                </div>
            </div>
        </ProtectedPage>
    )
}
