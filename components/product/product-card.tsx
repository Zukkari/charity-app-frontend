import {Product} from "../../service/product-service";
import ImageService from "../../service/image-service";
import {useContext} from "react";
import {CartContext} from "../../context/cart-context";

interface IProductCardProps {
    product: Product
}

const ProductCard = ({product}: IProductCardProps) => {
    const [cart, setCart] = useContext(CartContext)

    const notInStock = product.quantity <= 0
    const image = ImageService.getImage(product.productId)

    return <div className={"flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden rounded border lg:m-10"}>
        <div className={"w-1/3 bg-cover"}>
            <img src={image.path} alt={"This is an image of a product"} className={"h-full"}/>
        </div>
        <div className={"w-2/3 p-4"}>
            <h1 className={"text-gray-900 text-bold text-2xl"}>{product.name}</h1>
            <p className={"mt-2 text-gray-600 text-sm"}>Products in stock: {product.quantity}</p>
            <div className={"flex item-center justify-between mt-3"}>
                <h1 className={"text-gray-700 font-bold text-xl"}>{product.price}€</h1>
                <button
                    onClick={(_) => setCart({
                        ...cart,
                        products: [...cart.products, product]
                    })}
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
