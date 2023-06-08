import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../../../lib/contentful'
import RichTextBox from '../../../components/RichTextBox'
import ProductPictures from '../../../components/ProductPictures'
import { useFirestore } from '../../../context/FirestoreContext'
import { toast } from 'react-toastify'

export default function Product() {
    const { slug } = useParams()
    const [product, setProduct] = useState<any>()
    const [quantity, setQuantity] = useState<number>(1)

    const firestoreContext = useFirestore()

    useEffect(() => {
        const getProduct = async () => {
            const product = await client.getEntries({
                content_type: 'product',
                'fields.slug': slug,
            })

            setProduct(product.items[0])
        }
        getProduct()
    }, [])

    const addToCart = async (productID: string) => {
        if (quantity <= 0) return
        
        for (let i = 0; i < quantity; i++) {
            const response = await firestoreContext?.addToCart(productID)
        }
        toast.success('Added to cart')
    }

    return product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ProductPictures product={product} />
            <div className="flex flex-col gap-2 p-4 items-center">
                <div className="text-center flex flex-col gap-2 lg:gap-8 xl:mt-16">
                    <label className="text-stone-800 text-5xl font-extrabold uppercase">
                        {product.fields.title}
                    </label>
                    <label className="text-stone-500 text-6xl font-extrabold">
                        {product.fields.price} €
                    </label>
                </div>
                <div className="w-[150px] h-[2px] bg-stone-400 mt-8 mb-4"></div>
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 py-8">
                    <input
                        type="number"
                        value={quantity.toString()}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="col-span-2 md:col-span-1 lg:col-span-2 p-4 bg-stone-200 outline-none rounded-xl"
                        placeholder="Quantity"
                    />
                    <button
                        className="text-stone-400 bg-stone-200 px-8 rounded-xl hover:bg-stone-400 transition-all hover:text-stone-100"
                        onClick={() => addToCart(product.fields.slug)}
                    >
                        Add To Cart
                    </button>
                </div>
                <div className="w-[150px] h-[2px] bg-stone-400 mt-4 mb-4"></div>
                <div className="prose">
                    <RichTextBox content={product.fields.description} />
                </div>
            </div>
        </div>
    ) : null
}
