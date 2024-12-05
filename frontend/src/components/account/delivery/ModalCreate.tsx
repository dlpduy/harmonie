import { Input, Modal } from "antd"

export const ModalCreate = (props: any) => {

    const { isModalCreateOpen, handleOkCreate, handleCancelCreate } = props;

    return (
        <>
            <Modal title="Thêm địa chỉ nhận hàng"
                open={isModalCreateOpen}
                onOk={() => handleOkCreate()}
                onCancel={() => handleCancelCreate()}
                maskClosable={false}
                okText="Create"

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tên người nhận</span>
                        <Input />
                    </div>
                    <div>
                        <span>Số điện thoại</span>
                        <Input />
                    </div>
                    <div>
                        <span>Địa chỉ</span>
                        <Input />
                    </div>
                </div>
            </Modal>
        </>
    )
}