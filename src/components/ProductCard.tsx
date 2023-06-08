import React, { FC } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'

interface ProductCardProps {
    product: any
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate()

    const showPost = (slug: any) => {
        navigate('/products/' + slug)
    }

    return (
        <div
            key={product.fields.slug}
            onClick={() => showPost(product.fields.slug)}
            className="flex flex-col gap-8 pb-8 overflow-hidden rounded-xl bg-stone-100 text-stone-400 text-center h-full cursor-pointer"
        >
            <img
                className=" aspect-square bg-stone-200"
                src={product.fields.pictures[0].fields.file.url}
            ></img>
            <label className="uppercase text-stone-600 font-bold text-2xl px-2">
                {product.fields.title}
            </label>
        </div>
    )
}

export default ProductCard
