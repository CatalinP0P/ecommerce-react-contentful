import { useAuth0 } from '@auth0/auth0-react'
import React, { Context, useContext, createContext, FC, useState } from 'react'
import app from '../../src/lib/firebase'
import client from '../lib/contentful'
import { toast } from 'react-toastify'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import easyinvoice from 'easyinvoice'

interface proivderProps {
    children: any
}

interface firebaseContextInterface {
    getMyCart: () => Promise<any>
    addToCart: (productID: string) => any
    removeFromCart: (docID: string) => any
    placeOrder: (adress: any) => any
    getMyOrder: (orderID: any) => any
    createInvoice: (orderID: any) => any
}

const FirestoreContext = createContext<firebaseContextInterface | null>(null)

const FirestoreProvider: FC<proivderProps> = ({ children }) => {
    const [myCart, setMyCart] = useState<any>([])
    const auth = useAuth0()
    const firestore = app.firestore()
    const cartCollectionRef = firestore.collection('Cart')
    const orderCollectionRef = firestore.collection('Order')

    const getMyOrder = async (orderID: any) => {
        const order = await orderCollectionRef
            .where(app.firestore.FieldPath.documentId(), '==', orderID)
            .where('userID', '==', auth.user?.sub)
            .get()

        return {
            id: order.docs[0].id,
            adress: JSON.parse(order.docs[0].data().adressJSON),
            cart: JSON.parse(order.docs[0].data().cartJSON),
            userID: order.docs[0].data().userID,
            date: new Date(order.docs[0].data().date.seconds * 1000),
        }
    }

    const placeOrder = async (adress: any) => {
        if (!auth.isAuthenticated) {
            return 'You must be authenticated'
        }

        const cart = await getMyCart()
        var order = {
            userID: auth.user?.sub,
            cartJSON: JSON.stringify(cart),
            adressJSON: JSON.stringify(adress),
            date: new Date(),
        }

        // Removing from the cart
        const cartProducts = await cartCollectionRef
            .where('userID', '==', auth.user?.sub)
            .get()

        const batch = firestore.batch()
        cartProducts.forEach((product: any) => {
            batch.delete(product.ref)
        })
        batch.commit()

        const response = await orderCollectionRef.add(order)
        return response.id
    }

    const addToCart = async (productID: string) => {
        if (!auth.isAuthenticated) {
            toast.warn('You must login to see your cart')
            return
        }

        const cartDoc = {
            userID: auth.user?.sub,
            productID: productID,
        }

        cartCollectionRef
            .add(cartDoc)
            .then((response) => {
                return 'Done'
            })
            .catch((err) => {
                return err
            })
    }

    const removeFromCart = async (docID: string) => {
        if (!auth.isAuthenticated) {
            toast.warn('You must login to access your cart')
            return
        }

        const doc = cartCollectionRef.doc(docID)
        if (!doc) return 'DocID is not good'

        doc.delete()
        return 'Doc deleted'
    }

    const getMyCart = async () => {
        if (!auth.isAuthenticated) {
            toast.warn('You must login to see your cart')
            return
        }
        var cart: any[] = []
        const userId = auth.user?.sub
        const snapshot = await cartCollectionRef
            .orderBy('productID', 'asc')
            .where('userID', '==', auth.user?.sub)
            .get()
        snapshot.docs.map((doc) => {
            const item = {
                id: doc.id,
                ...doc.data(),
            }
            cart.push(item)
        })

        var productsCart: any = []
        var totalCart = 0
        for (let i = 0; i < cart.length; i++) {
            var product = cart[i]
            const contentfulEntry: any = await client.getEntries({
                content_type: 'product',
                'fields.slug': product.productID,
            })
            const contentfulProduct = contentfulEntry.items[0]
            product = {
                ...product,
                picture: contentfulProduct.fields.pictures[0].fields.file.url,
                price: contentfulProduct.fields.price,
                title: contentfulProduct.fields.title,
                quantity: 1,
            }
            // Checking if the product already in list
            const productInCart = productsCart.find(
                (m: any) => m.productID == product.productID
            )

            totalCart += product.price

            if (productInCart != null) {
                productsCart.map((product: any) => {
                    if (product.productID == productInCart.productID) {
                        product.quantity += 1
                    }
                })
            } else {
                productsCart.push(product)
            }
        }
        return productsCart
    }

    const createInvoice = async (orderId: any) => {
        const order = await getMyOrder(orderId)
        var companyDetails: any = await client.getEntries({
            content_type: 'companyInfo',
        })

        companyDetails = companyDetails.items[0].fields

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
        const response = await easyinvoice.createInvoice(data)
        console.log(response)
        return response
    }

    return (
        <FirestoreContext.Provider
            value={{
                getMyCart,
                addToCart,
                removeFromCart,
                placeOrder,
                getMyOrder,
                createInvoice,
            }}
        >
            {children}
        </FirestoreContext.Provider>
    )
}

export const useFirestore = () => {
    return useContext(FirestoreContext)
}

export default FirestoreProvider
