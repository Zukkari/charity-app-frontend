import {useState} from "react";

const ShoppingCartButton = () => {
    const light = '/shopping-cart.png';
    const dark = '/shopping-cart-dark.png'

    const [image, setImage] = useState(light)

    return <div onMouseOver={(_) => setImage(dark)}
                onMouseOut={(_) => setImage(light)}>
        <a href="#"
           className={
               "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white mt-4 lg:mt-0"
           }>
            <img
                src={image}
                alt={"Image of a shopping cart"}
                className={"object-contain"}
            />
        </a>
    </div>
}

export default ShoppingCartButton
