import type {AppProps} from 'next/app'

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

import 'tailwindcss/tailwind.css'
import React, {useState} from "react";
import {Cart, CartContext} from "../context/cart-context";


function App({Component, pageProps}: AppProps) {
    const cart = useState<Cart>({
        cartId: 0, products: []
    })

    return <div className={"flex flex-col h-screen justify-between"}>
        <Header/>

        <CartContext.Provider value={cart}>
            <Component {...pageProps} />
            <Footer/>
        </CartContext.Provider>
    </div>
}

export default App
