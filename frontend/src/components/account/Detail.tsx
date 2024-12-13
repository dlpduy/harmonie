import { Delivery } from './delivery/Delivery';
import { Order } from './order/Order';
import { Disburse } from './disburse/Disburse';
import { ChangePassword } from './ChangePassword';
import { InformationAccount } from './InformationAccount';

export const Information = (props: any) => {
    const { activeIndex, user, setUser, setIsSpinning } = props;
    {
        switch (activeIndex) {
            case 0:
                return <Disburse />;
            case 1:
                return <Order
                    setIsSpinning={setIsSpinning}
                />;
            case 2:
                return <ChangePassword />;
            case 3:
                return <InformationAccount
                    user={user}
                    setUser={setUser}
                    setIsSpinning={setIsSpinning}
                />;
            default:
                return <Delivery
                    setIsSpinning={setIsSpinning}
                />;
        }
    }
};
