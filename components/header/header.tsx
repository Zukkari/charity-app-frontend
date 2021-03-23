import ShoppingCartButton from "./shopping-cart-button";

const Header = () => {
    return <nav className={"flex items-center justify-between bg-black flex-wrap p-2"}>
        <div className="flex items-center flex-no-shrink text-white mr-6">
            <a href={"/"}>
                <span className={"font-semibold text-5xl tracking-tight"}>Charify</span>
            </a>
        </div>

        <ShoppingCartButton/>
    </nav>
}

export default Header
