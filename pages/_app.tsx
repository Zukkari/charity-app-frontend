import type {AppProps} from 'next/app'

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

import 'tailwindcss/tailwind.css'

function App({Component, pageProps}: AppProps) {
    return <div className={"flex flex-col h-screen justify-between"}>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
    </div>
}

export default App
