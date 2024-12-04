import { Input, Modal } from "antd"
import { useEffect, useState } from "react";
export const ModalUpdate = (props: any) => {
    const { isModalUpdateOpen, handleOkUpdate, handleCancelUpdate, name, phone, address } = props;
    const [nameUpdate, setNameUpdate] = useState(name);
    const [phoneUpdate, setPhoneUpdate] = useState(phone);
    const [addressUpdate, setAddressUpdate] = useState(address);
    useEffect(() => {
        setNameUpdate(name);
        setPhoneUpdate(phone);
        setAddressUpdate(address);
    }, [name, phone, address]);
    return (
        <>
            <Modal title="Chỉnh sửa địa chỉ nhận hàng"
                open={isModalUpdateOpen}
                onOk={() => handleOkUpdate()}
                onCancel={() => handleCancelUpdate()}
                maskClosable={false}
                mask={true} // Bật mask
                style={{ mask: 'rgba(0, 0, 0, 0.1)' }} // Thêm style trực tiếp
                okText="Update"

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tên người nhận</span>
                        <Input
                            value={nameUpdate}
                            onChange={(e) => setNameUpdate(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số điện thoại</span>
                        <Input
                            value={phoneUpdate}
                            onChange={(e) => setPhoneUpdate(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Địa chỉ</span>
                        <Input
                            value={addressUpdate}
                            onChange={(e) => setAddressUpdate(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}