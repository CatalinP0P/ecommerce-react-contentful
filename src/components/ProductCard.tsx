import React, { FC } from 'react'

interface ProductCardProps {
    post: any
}

const ProductCard: FC<ProductCardProps> = ({ post }) => {
    return (
        <div
            className="flex flex-col gap-8 pb-8 overflow-hidden rounded-xl bg-stone-100 text-stone-400 text-center h-full cursor-pointer"
            key={post.fields.slug}
        >
            <img
                className=" aspect-square bg-stone-200"
                src={post.fields.pictures[0].fields.file.url}
            ></img>
            <label className="uppercase text-stone-600 font-bold text-2xl px-2">
                {post.fields.title}
            </label>
        </div>
    )
}

export default ProductCard
