interface ILoadingComponentProps {
    text: string
}

const LoadingComponent = ({text}: ILoadingComponentProps) => {
    return <div className={"flex h-screen content-center"}>
        <div className={"m-auto"}>
            <div className={"text-gray-600 text-l w-36 lg:w-full lg:text-3xl text-center"}>{text}</div>
            <img className={"w-full h-36 pt-10"} src={"/spinner.svg"} alt={"Pulsing loader"}/>
        </div>
    </div>
}

export default LoadingComponent
