import { Button, Input, message, Modal, notification, Upload } from "antd"
import { useEffect, useState } from "react";

export const ModalUpdate = (props: any) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataPromotion } = props;

    const [code, setCode] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [releaseDate, setReleaseDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    useEffect(() => {
        setCode(dataPromotion.code);
        setQuantity(dataPromotion.quantity);
        setAmount(dataPromotion.amount);
        setReleaseDate(dataPromotion.releaseDate);
        setStartDate(dataPromotion.startDate);
        setExpirationDate(dataPromotion.expirationDate);
    }, [dataPromotion]);

    const resetModal = () => {
        setCode('');
        setQuantity(0);
        setAmount(0);
        setReleaseDate('');
        setStartDate('');
        setExpirationDate('');
    }

    const handleOkUpdate = async () => {
        setIsModalUpdateOpen(false);
        resetModal();


    }

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
        resetModal();
    }


    return (
        <>
            <Modal title="Cập nhật mã giảm giá"
                open={isModalUpdateOpen}
                onOk={() => {
                    handleOkUpdate()
                }}
                onCancel={() => {
                    handleCancelUpdate()
                }}
                maskClosable={false}
                okText="Update"

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Mã khuyến mãi</span>
                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <Input
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <span>Số tiền giảm</span>
                        <Input
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <span>Ngày phát hành</span>
                        <Input
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Ngày bắt đầu</span>
                        <Input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <span>Ngày hết hạn</span>
                        <Input
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}