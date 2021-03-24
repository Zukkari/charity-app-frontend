import {Image} from "../../service/image-service";
import React, {MouseEventHandler, useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/cart-context";
import CartService from "../../service/cart-service";
import ErrorAlert from "../error-alert";
import {Transition} from "@tailwindui/react";
import EventService, {DomainEvent} from "../../service/event-service";
import ProductCardImage from "./product-card-image";

interface IProductCardProps {
    productId: number,
    name: string,
    quantity: number,
    price: number,
    image: Image
}

interface IError {
    message: string,
    header: string
    show: boolean
}

const emptyError: IError = {header: "", message: "", show: false}

const ProductCard = ({productId, name, quantity, price, image}: IProductCardProps) => {
    const [cart, setCart] = useContext(CartContext)

    const [isEnabled, setEnabled] = useState(true)

    const [error, setError] = useState<IError>(emptyError)

    const [quantityState, setQuantityState] = useState(quantity)

    useEffect(() => {
        const sub = EventService.subscribe({
            onEvent(event: DomainEvent): void {
                if (event.productId === productId) {
                    setQuantityState(event.newQuantity)
                }
            }
        })

        return () => sub.unsubscribe();
    }, [])

    const itemBookingHandler: MouseEventHandler<HTMLElement> = (_) => {
        setEnabled(false)
        CartService.bookItem(cart.id!, productId)
            .then(c => {
                setCart(c)

                setTimeout(() => {
                    setEnabled(true)
                }, 500)
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
                setEnabled(true)
            })
    }

    const cartIsPaid = cart.paidTime !== undefined && cart.paidTime !== null;

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

        <ProductCardImage quantity={quantityState} image={image} handler={itemBookingHandler}/>

        <div className={"w-2/3 p-4"}>
            <h1 className={"text-gray-900 text-bold text-2xl"}>{name}</h1>
            <p className={"mt-2 text-gray-600 text-sm"}>Products in stock: {quantityState}</p>
            <div className={"flex item-center justify-between mt-3"}>
                <h1 className={"text-gray-700 font-bold text-xl"}>{price}€</h1>
                <button
                    onClick={(e) => itemBookingHandler(e)}
                    className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded disabled:opacity-50"
                    disabled={quantityState <= 0 || !isEnabled || cartIsPaid}>
                    Add to cart
                </button>
            </div>
            <div className={"text-xs mt-2"}>
                {image.credit}
            </div>
        </div>
    </div>
}

export default ProductCard
