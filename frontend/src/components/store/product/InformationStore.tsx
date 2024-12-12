
import { Button, DatePicker, Form, Input } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';


export const InforStore = () => {

    const [form] = Form.useForm();

    const [nameStore, setNameStore] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [creationDate, setCreationDate] = useState<string>('');
    const [taxId, setTaxId] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        console.log({ nameStore, address, creationDate, taxId, description });
    }

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Thông tin</h2>
                {/* <form>
                    <div className={styles.infoRow}>
                        <label htmlFor="nameStore" className={styles.infoLabel}>Tên cửa hàng:</label>
                        <input
                            type="text"
                            name="nameStore"
                            className={styles.infoValue}
                            placeholder="Tên cửa hàng"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="Email" className={styles.infoLabel}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className={styles.infoValue}
                            placeholder="Email"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="Phone" className={styles.infoLabel}>Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            className={styles.infoValue}
                            placeholder="Số điện thoại"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="address" className={styles.infoLabel}>Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            className={styles.infoValue}
                            placeholder="Địa chỉ"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Hoàn tất</button>
                </form> */}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 32 }}
                    //   onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    //className={styles.loginFormContainer}
                    style={{
                        height: '650px',
                        scale: '1.5',
                        width: '80%',
                        position: 'relative',
                        top: '30%',
                        left: '-10%'
                    }}
                >
                    <Form.Item
                        label="Tên cửa hàng"
                        name="nameStore"
                        rules={[{ required: true, message: 'Please input your store name!' }]}
                        initialValue={nameStore}
                    >
                        <Input
                            value={nameStore}
                            onChange={(e) => setNameStore(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Please input your store address!' }]}
                    >
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày tạo"
                        name="creationDate"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                        initialValue={creationDate}
                    >
                        <DatePicker
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setCreationDate(dateString)}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mã số thuế"
                        name="taxId"
                        rules={[{ required: true, message: 'Please input your tax ID!' }]}
                        initialValue={taxId}
                    >
                        <Input
                            value={taxId}
                            onChange={(e) => setTaxId(e.target.value)}

                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                        initialValue={description}
                    >
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                        <Button
                            type="primary"
                            formAction='submit'
                            loading={loading}
                            onClick={() => handleSubmit()}
                            style={{ width: '100%', height: '60px' }}
                        >
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
