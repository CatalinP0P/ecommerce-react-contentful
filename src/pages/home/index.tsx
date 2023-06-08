import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className="grid grid-cols-2 gap-8 md:gap-16 transition-all items-center md:hover:gap-32 md:hover:mt-4 pb-32 md:hover:pb-40">
                <img
                    src={require('../../assets/coffe-bag.png')}
                    className="col-span-2 md:col-span-1 w-full order-2 md:order-1"
                ></img>
                <label className="order-1 md:order-2 col-span-2 md:col-span-1 text-primary font-thin text-[22vw] s:text-[20vw] md:text-[10vw] xl:text-[8vw] 3xl:text-[6vw] leading-none w-full md:text-start ms-[10%] md:ms-0">
                    Best <br />
                    coffee
                    <br />
                    in town
                </label>
            </div>
            <hr className="border-t-2 border-stone-100" />

            <h1 className="text-center w-full text-8xl font-extralight mt-8">
                Buy
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mx-auto w-[60%] md:w-full py-16 gap-4">
                <Link to={'/products/#blend'}>
                    <div className="flex flex-col gap-4 transition-all hover:bg-stone-50 p-8 font-thin rounded-3xl cursor-pointer">
                        <img
                            className="aspect-square"
                            src={require('../../assets/blend.webp')}
                        ></img>
                        <label className="text-3xl text-center w-full">
                            Coffee Blend
                        </label>
                    </div>
                </Link>
                <Link to={'/products/#region'}>
                    <div className="flex flex-col gap-4 transition-all hover:bg-stone-50 p-8 font-thin rounded-3xl cursor-pointer">
                        <img
                            className="aspect-square"
                            src={require('../../assets/region.webp')}
                        ></img>
                        <label className="text-3xl text-center w-full">
                            Region
                        </label>
                    </div>
                </Link>
                <Link to={'/products/#extras'}>
                    <div className="flex flex-col gap-4 transition-all hover:bg-stone-100 p-8 font-thin rounded-3xl cursor-pointer">
                        <img
                            className="aspect-square"
                            src={require('../../assets/merch.webp')}
                        ></img>
                        <label className="text-3xl text-center w-full">
                            Merchendise
                        </label>
                    </div>
                </Link>
            </div>
        </>
    )
}
