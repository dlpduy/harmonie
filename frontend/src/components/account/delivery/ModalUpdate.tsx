import { Input, Modal, notification } from "antd"
import { useEffect, useState } from "react";
import { updateDeliveryAPI } from "../../../services/api.service1";
export const ModalUpdate = (props: any) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataDelivery } = props;
    const [consigneeName, setConsigneeName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roadNumber, setRoadNumber] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");

    const handleOkUpdate = async () => {
        try {
            const response: any = await updateDeliveryAPI(dataDelivery.id, { consignee_name: consigneeName, phone_number: phoneNumber, road_number: roadNumber, ward: ward, district: district, city: city });
            if (response.statusCode === 200) {
                notification.success({
                    message: "Thành công",
                    description: response.message
                })
                setIsModalUpdateOpen(false);
            }
            else {
                notification.error({
                    message: "Lỗi",
                    description: response.message
                })
            }
        }
        catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Có lỗi xảy ra khi cập nhật địa chỉ nhận hàng"
            })
            console.log("Error: ", error);
        }
    }
    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
    }
    useEffect(() => {
        const setData = () => {
            setConsigneeName(dataDelivery.consignee_name);
            setPhoneNumber(dataDelivery.phone_number);
            setRoadNumber(dataDelivery.road_number);
            setWard(dataDelivery.ward);
            setDistrict(dataDelivery.district);
            setCity(dataDelivery.city);
        }
        setData();
    }, [dataDelivery]);
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
                            value={consigneeName}
                            onChange={(e) => setConsigneeName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số điện thoại</span>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số đường</span>
                        <Input
                            value={roadNumber}
                            onChange={(e) => setRoadNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phường, xã</span>
                        <Input
                            value={ward}
                            onChange={(e) => setWard(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Quận, huyện</span>
                        <Input
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tỉnh, thành phố</span>
                        <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}