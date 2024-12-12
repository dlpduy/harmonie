import styles from '../../../styles/Management.module.css';
import { Button, message, notification, Popconfirm, PopconfirmProps } from "antd";
import { ModalUpdate } from "./ModalUpdate";
import { useEffect, useState } from "react";
import { ModalCreate } from './ModalCreate';
import { deleteDeliveryAPI, getAllDelivery } from '../../../services/api.service1';

// const recipients = [
//     {
//         id: 1,
//         consignee_name: "Nguyễn Văn A",
//         phone_number: "0901234567",
//         road_number: "123A",
//         ward: "Phường 1",
//         district: "Quận 1",
//         city: "Hồ Chí Minh"
//     },
//     {
//         id: 2,
//         consignee_name: "Trần Thị B",
//         phone_number: "0912345678",
//         road_number: "456B",
//         ward: "Phường 2",
//         district: "Quận 2",
//         city: "Hà Nội"
//     },
//     {
//         id: 3,
//         consignee_name: "Lê Minh C",
//         phone_number: "0923456789",
//         road_number: "789C",
//         ward: "Phường 3",
//         district: "Quận 3",
//         city: "Đà Nẵng"
//     },
//     {
//         id: 4,
//         consignee_name: "Phạm Thị D",
//         phone_number: "0934567890",
//         road_number: "101D",
//         ward: "Phường 4",
//         district: "Quận 4",
//         city: "Cần Thơ"
//     }
// ]



export const Delivery = () => {
    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        try {
            const response: any = await deleteDeliveryAPI(Number(e));
            if (response.statusCode === 200 || response.data === "Delete successfully") {
                notification.success({
                    message: "Xoa dia chi thanh cong",
                    description: "Xoa dia chi thanh cong"
                });
            }
            else {
                notification.error({
                    message: "Xoa dia chi that bai",
                    description: "Xoa dia chi that bai"
                });
            }
        }
        catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Có lỗi xảy ra khi xóa địa chỉ nhận hàng"
            })
            console.log("Error: ", error);
        }

    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        notification.error({
            message: "Xoa dia chi that bai",
            description: "Xoa dia chi that bai"
        });
    };

    const [allInfo, setAllInfo] = useState([])
    const [dataDelivery, setDataDelivery] = useState({});

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);
    };

    useEffect(() => {
        const getDataDelivery = async () => {
            try {
                const response: any = await getAllDelivery();
                if (response.statusCode === 200) {
                    setAllInfo(response.data);
                }
                else {
                    notification.error({
                        message: "Lỗi",
                        description: "Lấy thông tin vận chuyển thất bại"
                    })
                }
            }
            catch (error) {
                notification.error({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra khi lấy thông tin vận chuyển"
                })
            }
        }
        getDataDelivery();
    }, []);

    useEffect(() => {
        console.log(dataDelivery);
    }, [dataDelivery]);


    return (
        <>
            <section className={styles.mainSection}>
                <div className={styles.infoCard}>
                    <div className={styles.Header}>
                        <h2
                            className={styles.Title}
                            style={{
                                position: 'relative',
                                left: '-30%'
                            }}
                        >Thông tin vận chuyển</h2>
                        <Button
                            type="primary"
                            onClick={showModalCreate}
                            style={{
                                position: 'relative',
                                left: '23%',
                                height: '50px',
                                width: '200px',
                            }}
                        >
                            Thêm địa chỉ nhận hàng
                        </Button>
                        <ModalCreate
                            isModalCreateOpen={isModalCreateOpen}
                            setIsModalCreateOpen={setIsModalCreateOpen}
                        />
                    </div>
                    <table className={styles.Table}>
                        <thead className={styles.TableHeader}>
                            <tr>
                                <th>STT</th>
                                <th>Tên người nhận</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className={styles.TableBody}>
                            {allInfo.map((recipient: any, index) => (
                                <tr key={recipient.id}>
                                    <td>{index + 1}</td>
                                    <td>{recipient.consignee_name}</td>
                                    <td>{recipient.phone_number}</td>
                                    <td>{`${recipient.road_number}, ${recipient.ward}, ${recipient.district}, ${recipient.city}`}</td>
                                    <td>

                                        <Button type="primary" onClick={() => {
                                            showModalUpdate();
                                            setDataDelivery(recipient);
                                        }}>
                                            Edit
                                        </Button>
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Bạn có chắc muốn xóa địa chỉ này?"
                                            onConfirm={confirm.bind(null, recipient.id)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                danger
                                                style={{ marginTop: '10px' }}
                                            >Delete</Button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <ModalUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataDelivery={dataDelivery}
            />

        </>
    );
}