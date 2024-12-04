import { Delivery } from './delivery/Delivery';
import { Order } from './order/Order';
import { Disburse } from './disburse/Disburse';
import { ChangePassword } from './ChangePassword';
import { InformationAccount } from './InformationAccount';

interface InformationProps {
    activeIndex: Number;
}



export const Information = (props: InformationProps) => {
    const { activeIndex } = props;
    {
        switch (activeIndex) {
            case 0:
                return <Disburse />;
            case 1:
                return <Order />;
            case 2:
                return <ChangePassword />;
            case 3:
                return <InformationAccount />;
            default:
                return <Delivery />;
        }
    }
};
