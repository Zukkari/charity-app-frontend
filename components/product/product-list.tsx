import ProductCard from "./product-card";
import ProductService, {Product} from "../../service/product-service";

const ProductList = () => {
    const products: Product[] = ProductService.getAllProducts();

    return <div className={"flex flex-col h-full overflow-y-auto bg-green-100 m-auto"}>
        <div className={"grid grid-cols-1 lg:grid-cols-3 l w-full justify-self-start m-auto"}>
            {products.map(product => <ProductCard key={product.productId} product={product}/>)}
        </div>
    </div>

}

export default ProductList
