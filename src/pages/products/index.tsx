import React, { useEffect, useState } from 'react'
import client from '../../lib/contentful'
import { EntryCollection, EntrySkeletonType } from 'contentful'
import ProductCard from '../../components/ProductCard'
import { setMaxListeners } from 'events'
import Product from './product'
import { useFirestore } from '../../context/FirestoreContext'

export default function Products() {
    const [regionCoffee, setRegionCoffee] = useState<any>()
    const [blendCoffee, setBlendCoffee] = useState<any>()
    const [merch, setMerch] = useState<any>()

    const firestoreContext = useFirestore()

    useEffect(() => {
        const fetchProducts = async () => {
            var products = await client.getEntries({
                content_type: 'product',
                'fields.category': 'region',
            })
            setRegionCoffee([...products.items])

            products = await client.getEntries({
                content_type: 'product',
                'fields.category': 'blend',
            })
            setBlendCoffee(products.items)

            products = await client.getEntries({
                content_type: 'product',
                'fields.category': 'merch',
            })
            setMerch(products.items)
        }

        ;(async () => {
            await fetchProducts()
            const id = window.location.hash.substring(1)
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        })()
    }, [])

    return (
        <>
            {
                <>
                    <h1
                        className="text-6xl text-center pt-32 pb-16 text-stone-600 font-extralight"
                        id="region"
                    >
                        Regional Coffee
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
                        {regionCoffee?.map((product: any) => {
                            return (
                                <div key={product.fields.slug}>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })}
                    </div>
                </>
            }

            {
                <>
                    <h1 className="text-6xl text-center pt-32 text-stone-600 font-extralight">
                        Blend Coffee
                    </h1>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 pt-16"
                        id="blend"
                    >
                        {blendCoffee?.map((product: any) => {
                            return (
                                <div key={product.fields.slug}>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })}
                    </div>
                </>
            }

            {
                <>
                    <h1 className="text-6xl text-center pt-32 pb-16 text-stone-600 font-extralight">
                        Extras
                    </h1>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mb-32"
                        id="extras"
                    >
                        {merch?.map((product: any) => {
                            return (
                                <div key={product.fields.slug}>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </>
    )
}
