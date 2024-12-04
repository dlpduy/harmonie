import styles from '../../../styles/Management.module.css';
import { Button, message, notification, Popconfirm, PopconfirmProps } from "antd";
import { ModalUpdate } from "./ModalUpdate";
import { useState } from "react";
import { ModalCreate } from './ModalCreate';

const recipients = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường Lý Thường Kiệt, Quận 10, TP.HCM',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        phone: '0912345678',
        address: '456 Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
    },
    {
        id: 3,
        name: 'Lê Văn C',
        phone: '0923456789',
        address: '789 Đường Hoàng Sa, Quận 3, TP.HCM',
    },
    {
        id: 4,
        name: 'Phạm Thị D',
        phone: '0934567890',
        address: '101 Đường Hàm Nghi, Quận 4, TP.HCM',
    }
];

export const Delivery = () => {
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        notification.success({
            message: "Xoa dia chi thanh cong",
            description: "Xoa dia chi thanh cong"
        });

    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        notification.error({
            message: "Xoa dia chi that bai",
            description: "Xoa dia chi that bai"
        });
    };
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };
    const handleOkCreate = () => {
        setIsModalCreateOpen(false);
        message.success('Thêm địa chỉ thành công');
    };
    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
    };

    interface Recipient {
        id: number;
        name: string;
        phone: string;
        address: string;
    }
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState<Recipient>();
    const handleClickEdit = (recipient: Recipient) => {
        setSelectedRecipient(recipient);
        setIsModalUpdateOpen(true);
    };
    const handleOkUpdate = () => {
        setIsModalUpdateOpen(false);
        notification.success({
            message: "Cap nhat thanh cong",
            description: "Cap nhat dia chi thanh cong"
        });
    };
    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
    }

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
                            handleOkCreate={handleOkCreate}
                            handleCancelCreate={handleCancelCreate}
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
                            {recipients.map((recipient) => (
                                <tr key={recipient.id}>
                                    <td>{recipient.id}</td>
                                    <td>{recipient.name}</td>
                                    <td>{recipient.phone}</td>
                                    <td>{recipient.address}</td>
                                    <td>

                                        <Button type="primary" onClick={() => handleClickEdit(recipient)}>
                                            Edit
                                        </Button>
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Bạn có chắc muốn xóa địa chỉ này?"
                                            onConfirm={confirm}
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
                handleOkUpdate={handleOkUpdate}
                handleCancelUpdate={handleCancelUpdate}
                name={selectedRecipient ? selectedRecipient.name : ''}
                phone={selectedRecipient ? selectedRecipient.phone : ''}
                address={selectedRecipient ? selectedRecipient.address : ''}
            />

        </>
    );
}