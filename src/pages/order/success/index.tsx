import React, { FC, useEffect, useState, useRef } from 'react'
import { useFirestore } from '../../../context/FirestoreContext'
import client from '../../../lib/contentful'
import CartPriceList from '../../../components/CartPriceList'
import easyinvoice from 'easyinvoice'
import { useNavigate } from 'react-router-dom'

interface OrderSuccessProps {
    invoice: any
}

const OrderSuccess: FC<OrderSuccessProps> = ({ invoice }) => {
    const firestoreContext = useFirestore()
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    const download = async () => {
        if (invoice == null) return
        easyinvoice.download('invoice.pdf', invoice.pdf)
    }

    useEffect(() => {
        easyinvoice.render('pdf', invoice.pdf, () => {
            console.log('EasyInvoice: Invoice rendered')
        })
    })

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-4 gap-4">
                <div className="flex flex-col items-center">
                    <div className="relative w-[90%] mx-auto overflow-hidden h-0 pb-[125%] border-2 border-black object-fill">
                        <div
                            id="pdf"
                            className="text-center absolute left-0 top-0 w-full h-full object-fill"
                        ></div>
                    </div>
                    <button className={buttonClass} onClick={() => download()}>
                        Download
                    </button>
                </div>
                <div className="flex flex-col items-center gap-32">
                    <div className="flex flex-col">
                        <label className="text-6xl text-stone-700 font-extralight text-center block">
                            Thanks for ordering
                        </label>
                        <label className="text-4xl text-stone-700 font-extralight text-center block mt-4">
                            We sent you an email for cofirmation
                        </label>
                    </div>
                    <button onClick={() => goHome()} className={buttonClass}>
                        Go Back
                    </button>
                </div>
            </div>
        </>
    )
}
const buttonClass =
    'mx-auto px-6 py-4 bg-stone-200 text-stone-400 hover:bg-stone-400 hover:text-stone-50'

export default OrderSuccess
