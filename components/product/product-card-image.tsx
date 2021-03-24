import React from "react";
import {Image} from "../../service/image-service";

interface IProductDescriptionProps {
    quantity: number,
    image: Image,
    handler: (e: React.MouseEvent<HTMLImageElement>) => void
}

const ProductCardImage = ({quantity, image, handler}: IProductDescriptionProps) => {
    return <div className={"w-1/3 bg-cover"}>
        <img src={image.path} alt={image.altText}
             className={"m-auto" + (quantity <= 0 ? " opacity-30" : "")} onClick={(e) => handler(e)}/>
    </div>
}

export default ProductCardImage
