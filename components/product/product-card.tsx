import ImageService from "../../service/image-service";
import React, {MouseEventHandler, useContext, useState} from "react";
import {CartContext} from "../../context/cart-context";
import CartService from "../../service/cart-service";
import ErrorAlert from "../error-alert";
import {Transition} from "@tailwindui/react";

interface IProductCardProps {
    productId: number,
    name: string,
    quantity: number,
    price: number
}

interface IError {
    message: string,
    header: string
    show: boolean
}

const emptyError: IError = {header: "", message: "", show: false}

const ProductCard = ({productId, name, quantity, price}: IProductCardProps) => {
    const [cart, setCart] = useContext(CartContext)

    const [error, setError] = useState<IError>(emptyError)

    const notInStock = quantity <= 0;
    const image = ImageService.getImage(productId)

    const handler: MouseEventHandler<HTMLElement> = (_) => {
        CartService.bookItem(cart.id!, productId)
            .then(c => {
                setCart(c)
            })
            .catch(err => {
                console.log("Error during booking an item", err)
                setError({
                    header: "Oops!",
                    message: "An item you are trying to order is out of stock!",
                    show: true
                })

                setTimeout(() => {
                    setError(emptyError)
                }, 5000)
            })
    }

    return <div className={"flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden rounded border lg:m-10"}>
        <Transition show={error.show}
                    enter="transition-opacity duration-250"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-250"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
            <div className={"float-right absolute bottom-0 right-0 mb-12 mr-12 w-1/5"}>
                <ErrorAlert header={error.header} message={error.message}/>
            </div>
        </Transition>

        <div className={"w-1/3 bg-cover"}>
            <img src={image.path} alt={"This is an image of a product"}
                 className={"h-full" + (notInStock ? " opacity-30" : "")} onClick={(e) => handler(e)}/>
        </div>
        <div className={"w-2/3 p-4"}>
            <h1 className={"text-gray-900 text-bold text-2xl"}>{name}</h1>
            <p className={"mt-2 text-gray-600 text-sm"}>Products in stock: {quantity}</p>
            <div className={"flex item-center justify-between mt-3"}>
                <h1 className={"text-gray-700 font-bold text-xl"}>{price}€</h1>
                <button
                    onClick={(e) => handler(e)}
                    className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded disabled:opacity-50"
                    disabled={notInStock}>
                    Add to Card
                </button>
            </div>
            <div className={"text-xs mt-2"}>
                {image.credit}
            </div>
        </div>
    </div>
}

export default ProductCard
