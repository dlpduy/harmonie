import { InforStore } from './infor/InformationStore';
import { Boxes } from './order/Boxes';
import { Product } from './product/Product';
import { Promotion } from './promotion/Promotion';
import { Revenue } from './product/Revenue';


interface InformationProps {
    activeIndex: Number;
}



export const Information = (props: InformationProps) => {
    const { activeIndex } = props;
    {
        switch (activeIndex) {
            case 0:
                return <Product />;
            case 1:
                return <Boxes />;
            case 2:
                return <Promotion />;
            default:
                return <InforStore />;
        }
    }
};
