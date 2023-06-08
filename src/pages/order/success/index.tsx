import React, { FC, useEffect, useState, useRef } from 'react'
import { useFirestore } from '../../../context/FirestoreContext'
import client from '../../../lib/contentful'
import CartPriceList from '../../../components/CartPriceList'
import easyinvoice from 'easyinvoice'
import { useNavigate } from 'react-router-dom'

interface OrderSuccessProps {
    orderID: any
}

const OrderSuccess: FC<OrderSuccessProps> = ({ orderID }) => {
    const [invoice, setInvoice] = useState<any>()

    const firestoreContext = useFirestore()
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    const fetchOrder = async () => {
        const order = await firestoreContext?.getMyOrder(orderID)
        const companyDetails = await client.getEntries({
            content_type: 'companyInfo',
        })
        const dt = new Date(order.date)
        const dateString = getDateString(dt)
        order.date = dateString
        console.log(order)

        createInvoice(order, companyDetails.items[0].fields)
    }

    const getDateString = (dt: Date) => {
        const year = dt.getFullYear()
        const month = dt.getMonth()
        const dateString = `${dt.getUTCDate()}-${month + 1}-${year}`
        return dateString
    }

    const createInvoice = async (order: any, companyDetails: any) => {
        const products: any = []
        order.cart.forEach((product: any) => {
            products.push({
                quantity: product.quantity,
                description: product.title,
                'tax-rate': 19,
                price: product.price / 1.19,
            })
        })
        products.push({
            quantity: 1,
            description: 'Shipping',
            'tax-rate': 0,
            price: 10,
        })
        var data: any = {
            images: {
                logo: 'https:' + companyDetails.logo.fields.file.url,
            },
            sender: {
                company: companyDetails.name,
                zip: companyDetails.county,
                address: companyDetails.street,
                city: companyDetails.city,
                country: companyDetails.country,
                custom1: companyDetails.email,
            },
            client: {
                company: companyDetails.name,
                zip: companyDetails.county,
                address: companyDetails.street,
                city: companyDetails.city,
                country: companyDetails.country,
                custom1: companyDetails.email,
            },
            information: {
                number: order.id,
                date: new Date(order.date).toLocaleDateString(),
                'due-date': new Date(
                    new Date(order.date).getTime() + 14 * 24 * 60 * 60 * 1000
                ).toLocaleDateString(),
            },
            products: products,
            'bottom-notice': 'Thanks for ordering!',
            settings: {
                currency: 'EUR',
            },
        }
        var elementId = 'pdf'
        easyinvoice.createInvoice(data, function (result) {
            setInvoice(result)
            easyinvoice.render(elementId, result.pdf, function () {
                console.log('Invoice rendered!')
            })
        })
    }

    const download = async () => {
        if (invoice == null) return
        
        easyinvoice.download('invoice.pdf', invoice.pdf)
    }

    useEffect(() => {
        ;(async () => {
            fetchOrder().then(() => {})
        })()
    }, [])

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
                    <label className="text-6xl text-stone-700 font-extralight text-center block">
                        Thanks for ordering
                    </label>
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
