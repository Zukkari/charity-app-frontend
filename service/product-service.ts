const ProductService = {
    getAllProducts: function (): Product[] {
        return [{"productId": 1, "name": "Brownie", "price": 0.65, "quantity": 44}, {
            "productId": 2,
            "name": "Muffin",
            "price": 1.00,
            "quantity": 36
        }, {"productId": 3, "name": "Cake Pop", "price": 1.35, "quantity": 24}, {
            "productId": 4,
            "name": "Apple tart",
            "price": 1.50,
            "quantity": 60
        }, {"productId": 5, "name": "Water", "price": 1.50, "quantity": 30}, {
            "productId": 6,
            "name": "Shirt",
            "price": 2.00,
            "quantity": 0
        }, {"productId": 7, "name": "Pants", "price": 3.00, "quantity": 0}, {
            "productId": 8,
            "name": "Jacket",
            "price": 4.00,
            "quantity": 0
        }, {"productId": 9, "name": "Toy", "price": 1.00, "quantity": 0}]

    }
}

export interface Product {
    productId: number
    name: string,
    quantity: number,
    price: number
}

export default ProductService
