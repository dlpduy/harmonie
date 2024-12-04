import React from 'react';
import styles from '../styles/StoreCreation.module.css';

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type }) => (
    <div className={styles.inputGroup}>
        <label htmlFor={id} className={styles.label}>{label}</label>
        <input type={type} id={id} className={styles.input} />
    </div>
);

const StoreInfoForm: React.FC = () => {
    return (
        <>
            <div className={styles.formGroup}>
                <h2 className={styles.sectionTitle}>Thông tin cửa hàng</h2>
            </div>
            <form style={{
                position: 'relative',
                left: '40%',
                top: '-60px',
            }}>
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
            </form>
        </>

    )
};


interface InputFieldProps {
    label: string;
    id: string;
    type: string;
}

const TaxInfoForm: React.FC = () => {
    return (
        <>
            <div className={styles.formGroup}>
                <h2 className={styles.sectionTitle}>Thông tin thuế</h2>
            </div>
            <form style={{
                position: 'relative',
                left: '42.7%',
                top: '-60px',
            }}>
                <div className={styles.infoRow}>
                    <label htmlFor="tax" className={styles.infoLabel}>Mã số thuế:</label>
                    <input
                        type="text"
                        name="tax"
                        className={styles.infoValue}
                        placeholder="Mã số thuế"
                        style={{ outline: 'none' }}
                    />
                </div>

            </form>
        </>
    );
};



const CreateStore: React.FC = () => {
    return (
        <div
            style={{
                backgroundColor: '#f5f5f5',
                height: '100%',
                margin: 0,
                position: 'relative',
                width: '100%',
            }}>
            <main className={styles.container}>
                <div className={styles.header}
                    style={{
                        padding: '1rem',
                        display: 'flex',
                        position: 'relative',
                        top: '10px',
                    }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c93adb32ee2e88741de4a7617131539b10630a741a8230afc46608de1a1cf39d?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea" alt="Store creation logo" className={styles.logo} />
                    <h1 className={styles.title}>Tạo cửa hàng</h1>
                </div>
                <section className={styles.formContainer}>
                    <StoreInfoForm />
                    <TaxInfoForm />
                    <button type="submit" className={styles.submitButton}>Hoàn tất</button>
                </section>
            </main>
        </div>
    );
};

export default CreateStore;