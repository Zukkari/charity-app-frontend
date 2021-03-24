import ProductCard from "./product-card";
import ProductService from "../../service/product-service";
import {useEffect, useState} from "react";
import {Product} from "../../schema";
import ImageService from "../../service/image-service";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getAllProducts()
            .then(response => setProducts(response))
    }, [])

    return <div className={"flex flex-col h-full overflow-y-auto bg-gray-100 m-auto"}>
        <div className={"grid grid-cols-1 lg:grid-cols-3 l w-full justify-self-start m-auto"}>
            {products.map(product => <ProductCard key={product.productId} name={product.name!}
                                                  productId={product.productId!} quantity={product.quantity!}
                                                  price={product.price!}
                                                  image={ImageService.getImage(product.productId!)}/>)}
        </div>
    </div>

}

export default ProductList
