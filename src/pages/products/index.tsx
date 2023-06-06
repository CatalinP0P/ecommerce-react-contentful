import React, { useEffect, useState } from 'react'
import client from '../../lib/contentful'
import { EntryCollection, EntrySkeletonType } from 'contentful'
import ProductCard from '../../components/ProductCard'

export default function Products() {
    const [posts, setPosts] = useState<any>()

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await client.getEntries({ content_type: 'product' })
            setPosts(posts.items)
            console.log(posts.items)
        }
        fetchPosts()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
            {posts &&
                posts.map((post: any) => {
                    return <ProductCard post={post} />
                })}
        </div>
    )
}
