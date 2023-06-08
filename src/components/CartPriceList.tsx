import { privateDecrypt } from 'crypto'
import React, { FC, useEffect, useState } from 'react'

interface CartPriceListProps {
    myCart: any
}

const CartPriceList: FC<CartPriceListProps> = ({ myCart }) => {
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        myCart.forEach((product: any) => {
            setTotal((old) => (old += product.quantity * product.price))
        })
    }, [myCart])

    return (
        <div>
            <div className="grid grid-cols-12 items-center  text-stone-500 border-2 border-stone-300 text-center">
                <label className="col-span-1 border-2 border-stone-300 p-4 h-full bg-stone-100">
                    QTY
                </label>
                <label className="col-span-6 border-2 border-stone-300 p-4 h-full bg-stone-100">
                    PRODUCT
                </label>
                <label className="col-span-2 border-2 border-stone-300 p-4 h-full bg-stone-100">
                    UNIT PRICE
                </label>
                <label className="col-span-3 border-2 border-stone-300 p-4 h-full bg-stone-100">
                    AMOUNT
                </label>
                {myCart.map((product: any) => {
                    return (
                        <div key={product.id} className='grid grid-cols-12 col-span-12'>
                            <label className="col-span-1 border-2 border-stone-300 p-4 h-full">
                                {product.quantity}
                            </label>
                            <label className="col-span-6 border-2 border-stone-300 p-4 h-full uppercase text-start">
                                {product.title}
                            </label>
                            <label className="col-span-2 border-2 border-stone-300 p-4 h-full text-end">
                                {product.price}
                            </label>
                            <label className="col-span-3 border-2 border-stone-300 p-4 h-full text-end">
                                {product.price * product.quantity}
                            </label>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-12 text-stone-500">
                <div className="col-span-9">
                    <label className="block text-end p-4 border-r-2 border-stone-300 h-full">
                        Subtotal
                    </label>
                </div>
                <div className="col-span-3 border-l-2 border-r-4 border-stone-300 p-4 h-full w-full text-end">
                    {total.toFixed(2)} €
                </div>

                <div className="col-span-9">
                    <label className="block text-end p-4 border-r-2 border-stone-300 h-full">
                        Shipping
                    </label>
                </div>
                <div className="col-span-3 border-l-2 border-r-4 border-stone-300 p-4 h-full w-full text-end">
                    {10} €
                </div>

                <div className="col-span-9 text-black font-bold text-4xl ">
                    <label className="block text-end p-4 border-r-2 border-stone-300 h-full uppercase">
                        Total
                    </label>
                </div>
                <div className="col-span-3 border-l-2 border-r-4 border-t-4 border-b-4 border-stone-300 p-4 h-full w-full text-end text-black font-bold text-4xl bg-stone-100">
                    {(total + 10).toFixed(2)} €
                </div>
            </div>
        </div>
    )
}

export default CartPriceList
