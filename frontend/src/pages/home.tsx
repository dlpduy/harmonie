import { ProductGird } from "../components/products/ProductGrid"


const HomePage = (props: any) => {
    const { isSpinning, setIsSpinning } = props;

    console.log(isSpinning)

    return (
        <>
            <ProductGird />
        </>
    )
}

export default HomePage
