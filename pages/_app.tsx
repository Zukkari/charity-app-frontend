import type {AppProps} from 'next/app'

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

import 'tailwindcss/tailwind.css'
import React, {useEffect, useState} from "react";
import {CartContext} from "../context/cart-context";
import LoadingComponent from "../components/loading-component";
import CartService from "../service/cart-service";
import {Cart} from "../schema";


function App({Component, pageProps}: AppProps) {
    const [isLoaded, setLoaded] = useState(false)

    const [cart, setCart] = useState<Cart>({})
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        const cartKey = "cartId";

        const fromStorage = sessionStorage.getItem(cartKey)
        if (fromStorage) {
            console.log("Found cart id from local storage: " + fromStorage)
            CartService.getCart(Number.parseInt(fromStorage))
                .then(c => {
                    setCart(c)
                })
                .catch(ex => {
                    // Cart has been deleted, timed out
                    setRetry(true)
                    sessionStorage.removeItem(cartKey)
                })
                .then(_ => {
                    setTimeout(() => {
                        setLoaded(true)
                        setRetry(false)
                    }, 500)
                })
            return
        }

        setRetry(false)
        CartService.createNewCart()
            .then(c => {
                setCart(c)
                sessionStorage.setItem(cartKey,  c.id!.toString())
            })
            .then(_ => {
                // Actually so we can see the pretty animation
                setTimeout(() => {
                        setRetry(false)
                        setLoaded(true)
                    }
                    , 2000)
            })
            .catch(e => {
                console.log("Error when creating cart", e)

                setTimeout(() => {
                    setRetry(true)
                }, 10000)
            })
    }, [retry])

    if (!isLoaded) {
        return <LoadingComponent text={"Please wait while we load the content for you"}/>
    }

    return <div className={"flex flex-col h-screen justify-between bg-gray-100"}>
        <Header/>

        <CartContext.Provider value={[cart, setCart]}>
            <Component {...pageProps} />
            <Footer/>
        </CartContext.Provider>
    </div>
}

export default App
