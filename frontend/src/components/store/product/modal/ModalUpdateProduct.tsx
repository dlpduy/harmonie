import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Upload } from "antd"
import { useState } from "react";

export const ModalUpdate = (props: any) => {

    const { isModalCreateOpen, handleOkCreate, handleCancelCreate } = props;

    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (newFileList: any) => {
        setFileList(newFileList);
    };

    const resetModal = () => {
        setProductName('');
        setBrand('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setFileList([]);
    }

    return (
        <>
            <Modal title="Thêm sản phẩm"
                open={isModalCreateOpen}
                onOk={() => {
                    console.log(productName, brand, price, quantity, description, fileList),
                        handleOkCreate(),
                        resetModal()
                }}
                onCancel={() => {
                    handleCancelCreate(),
                        resetModal()
                }}
                maskClosable={false}
                okText="Create"

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tên sản phẩm</span>
                        <Input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Brand</span>
                        <Input
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Giá bán</span>
                        <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <Input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Mô tả</span>
                        <Input.TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <span>Ảnh</span>
                        <Upload
                            action="/upload" // API upload file, thay đổi theo backend của bạn
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}  // Tắt upload tự động, xử lý thủ công khi nhấn ok
                            onChange={(info) => handleFileChange(info.fileList)}
                            multiple
                        >
                            {fileList.length < 1 && <Button icon={<UploadOutlined />}>Chọn ảnh</Button>}
                        </Upload>
                    </div>
                </div>
            </Modal>
        </>
    )
}