import {createConfiguration, Product, ProductApi} from "../schema";

const ProductService = {
    getAllProducts: async function (): Promise<Product[]> {
        const config = createConfiguration();
        const api = new ProductApi(config)
        return await api.getAllProducts();
    }
}

export default ProductService
