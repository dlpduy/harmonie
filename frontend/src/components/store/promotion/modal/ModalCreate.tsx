import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, notification, Upload } from "antd"
import { useState } from "react";
import { createProductAPI } from "../../../../services/api.service1";

export const ModalCreate = (props: any) => {

    const { isModalCreateOpen, setIsModalCreateOpen } = props;

    const [code, setCode] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [releaseDate, setReleaseDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const resetModal = () => {
        setCode('');
        setQuantity(0);
        setAmount(0);
        setReleaseDate('');
        setStartDate('');
        setExpirationDate('');
    }

    const handleOkCreate = async () => {
        console.log({ code, quantity, releaseDate, startDate, expirationDate });


    }

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        console.log({ code, quantity, releaseDate, startDate, expirationDate });
        //resetModal();
    }


    return (
        <>
            <Modal title="Thêm mã giảm giá"
                open={isModalCreateOpen}
                onOk={() => {
                    handleOkCreate()
                }}
                onCancel={() => {
                    handleCancelCreate()
                }}
                maskClosable={false}
                okText="Create"

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
                            onChange={(e) => !isNaN(quantity) ? setQuantity(Number(e.target.value)) : setQuantity(0)}
                        />
                    </div>
                    <div>
                        <span>Số tiền giảm</span>
                        <Input
                            value={amount}
                            onChange={(e) => !isNaN(amount) ? setAmount(Number(e.target.value)) : setAmount(0)}
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