export interface Image {
    path: string
    credit: string
    altText: string
}

const ImageService = {
    getImage: function (productId: number): Image {
        switch (productId) {
            case 1:
                return {
                    path: "/brownie.jpg",
                    credit: "Photo by hartini a from FreeImages",
                    altText: "Picture of a brownie"
                }
            case 2:
                return {
                    altText: "Photo of a muffin",
                    credit: "Photo by Konstantinos Dafalias from FreeImages",
                    path: "/muffin.jpg"
                }
            case 3:
                return {
                    altText: "Photo of cake pops",
                    credit: "Photo by PARKER FEIERBACH from Pinterest",
                    path: "/cake-pops.jpg"
                }
            case 4:
                return {
                    altText: "Photo of apple plie",
                    credit: "Photo by erwan LEPELTIER from FreeImages",
                    path: "/apple-tart.jpg"
                }
            case 5:
                return {
                    altText: "Photo of water in a cup",
                    credit: "Photo by Fleur Suijten from FreeImages",
                    path: "/water.jpg"
                }
            case 6:
                return {
                    altText: "Photo of a blue T-shirt",
                    credit: "Photo by Dragan Sasic from FreeImages",
                    path: "/t-shirt.jpg"
                }
            case 7:
                return {
                    altText: "Photo of sports pants",
                    credit: "",
                    path: "/pants.jpg"
                }
            case 8:
                return {
                    altText: "Photo of blue jacket",
                    credit: "",
                    path: "/jacket.jpg"
                }
            case 9:
                return {
                    path: "/toy.jpg",
                    credit: "",
                    altText: "Picture of Pikachu pokemon"
                }
            default: {
                return {
                    path: "",
                    credit: "",
                    altText: "Placeholder image"
                }
            }
        }
    }
}

export default ImageService;
