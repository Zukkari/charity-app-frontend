import {createConfiguration, Product, ProductApi} from "../schema";

const config = createConfiguration();
const api = new ProductApi(config)

const ProductService = {
    getAllProducts: async function (): Promise<Product[]> {
        return await api.getAllProducts();
    }
}

export default ProductService
