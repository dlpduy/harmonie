import { Button } from "antd";
import Modal from "antd/es/modal/Modal"
import { useState } from "react";


export const ModalDetail = (props: any) => {

    const { isModalDetailOpen, setIsModalDetailOpen, dataOrder } = props;

    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        setIsModalDetailOpen(false);
    }

    const handleCancel = () => {
        setIsModalDetailOpen(false);
    }

    return (
        <Modal
            title="Chi tiết đơn hàng"
            open={isModalDetailOpen}
            onOk={handleOk}
            maskClosable={false}
            onCancel={handleCancel}
            confirmLoading={loading}  // Bật trạng thái loading cho nút OK
            okText="Xác nhận"
            cancelText="Hủy"
        >
            <p style={{ color: 'red' }}>Mã đơn hàng: <span style={{ fontWeight: 'bold' }}>{dataOrder.code}</span></p>
            <p style={{ color: 'red' }}>Ngày tạo đơn: <span style={{ fontWeight: 'bold' }}>{dataOrder.date}</span></p>
            <p style={{ color: 'red' }}>Giá tiền: <span style={{ fontWeight: 'bold' }}>{dataOrder.totalCost}</span></p>
            <p style={{ color: 'red' }}>Trạng thái: <span style={{ fontWeight: 'bold' }}>{dataOrder.status}</span></p>
            <p style={{ color: 'red', fontWeight: 'bold', marginTop: '5%' }}>Danh sách sản phẩm:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>STT</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Tên sản phẩm</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Số lượng</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Giá tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOrder?.boxes && dataOrder.boxes.length > 0 ? (
                        dataOrder.boxes.map((box: any, index: number) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{index + 1}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{box.productName}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{box.quantity}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{box.price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Modal>
    )
}