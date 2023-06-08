import React, { FC, useState } from 'react'

interface ProductPicturesProps {
    product: any
}

const ProductPictures: FC<ProductPicturesProps> = ({ product }) => {
    const [selectedImage, selectImage] = useState<any>(
        product.fields.pictures[0]
    )

    return (
        <div className="flex flex-col gap-16 w-full">
            <img
                className="aspect-square overflow-hidden w-full"
                src={selectedImage.fields.file.url}
            ></img>
            <div className="grid grid-cols-4 gap-4 md:gap-8 lg:gap-16">
                {product.fields.pictures.map((picture: any) => {
                    const className =
                        selectedImage.fields.title == picture.fields.title
                            ? 'aspect-square border-2 rounded-md border-black'
                            : 'aspect-square cursor-pointer hover:border-[1px] rounded-md border-black'
                    return (
                        <img 
                            onClick={() => selectImage(picture)}
                            key={picture.fields.file.url}
                            className={className}
                            src={picture.fields.file.url}
                        ></img>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductPictures
