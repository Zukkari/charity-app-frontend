import ProductCard from "./product-card";
import ProductService from "../../service/product-service";
import {useEffect, useState} from "react";
import {Product} from "../../schema";
import EventService from "../../service/event-service";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getAllProducts()
            .then(response => setProducts(response))
    }, [])

    useEffect(() => {
        const url = EventService.getURL();
        const sse = new EventSource(url)
        sse.onmessage = event => {
            const parsed = JSON.parse(event.data)
            const domainEvent = JSON.parse(parsed[1].data)

            console.log(domainEvent)
            doUpdate(domainEvent.productId, domainEvent.newQuantity)

            function doUpdate(id: number, newCount: number): void {
                const copy = products.slice()

                const match = copy.find(product => product.productId == id)
                if (!match) {
                    return
                }

                const index = copy.indexOf(match)
                copy[index] = {
                    ...match,
                    quantity: newCount
                }

                setProducts(copy)
            }
        }

        return () => sse.close()
    }, [products])

    return <div className={"flex flex-col h-full overflow-y-auto bg-gray-100 m-auto"}>
        <div className={"grid grid-cols-1 lg:grid-cols-3 l w-full justify-self-start m-auto"}>
            {products.map(product => <ProductCard key={product.productId} product={product}/>)}
        </div>
    </div>

}

export default ProductList
