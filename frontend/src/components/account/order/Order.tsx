
import { Button } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useState } from 'react';
import { ModalDetail } from './ModalOrderDetail';
const orders = [
    {
        id: 1,
        code: 'KH13249',
        date: '06/11/2024',
        totalCost: 100202,
        status: 'Đã giao',
        boxes: [
            { productName: 'Áo thun', quantity: 2, price: '50.000' },
            { productName: 'Quần jean', quantity: 1, price: '100.000' }
        ]
    },
    {
        id: 2,
        code: 'KH13523',
        date: '07/11/2024',
        totalCost: 100423,
        status: 'Chưa giao',
        boxes: [
            { productName: 'Giày thể thao', quantity: 1, price: '120.000' },
            { productName: 'Mũ lưỡi trai', quantity: 2, price: '40.000' }
        ]
    },
    {
        id: 3,
        code: 'KH10232',
        date: '08/11/2024',
        totalCost: 248348,
        status: 'Chưa giao',
        boxes: [
            { productName: 'Laptop', quantity: 1, price: '200.000' },
            { productName: 'Chuột không dây', quantity: 1, price: '48.348' }
        ]
    },
    {
        id: 4,
        code: 'KH14548',
        date: '09/11/2024',
        totalCost: 358248,
        status: 'Đã giao',
        boxes: [
            { productName: 'Điện thoại', quantity: 1, price: '300.000' },
            { productName: 'Bao da', quantity: 1, price: '58.248' }
        ]
    },
]

const NumberToCurrency = (money: any) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
    return `${formattedAmount} VNĐ`;
};

export const Order = () => {

    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    const [dataOrder, setDataOrder] = useState<Object>({});

    const showModalDetail = () => {
        setIsModalDetailOpen(true);
    };

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-170%'
                        }}
                    >Đơn hàng</h2>
                </div>

                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày tạo đơn</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {orders.map((order, index) => (

                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.code}</td>
                                <td>{order.date}</td>
                                <td>{NumberToCurrency(order.totalCost)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Button
                                        style={{
                                            textDecoration: 'underline',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            color: '#000000'
                                        }}
                                        onClick={() => {
                                            setDataOrder({
                                                id: order.id,
                                                code: order.code,
                                                date: order.date,
                                                totalCost: NumberToCurrency(order.totalCost),
                                                status: order.status,
                                                boxes: order.boxes
                                            });
                                            showModalDetail()
                                        }}
                                    >Chi tiết</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalDetail
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
                dataOrder={dataOrder}
            />
        </section>
    );
}
