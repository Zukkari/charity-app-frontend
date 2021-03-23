interface ICheckoutCardItemProps {
    name: string
    price: number
}

const CheckoutCardItem = ({name, price}: ICheckoutCardItemProps) => {
    return <div className={"w-full text-center mt-2"}>
        {name} {price}€
    </div>
}

export default CheckoutCardItem
