import styles from '../../styles/Management.module.css';


export const ChangePassword = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Đổi mật khẩu</h2>
                <form>
                    <div className={styles.infoRow}>
                        <label htmlFor="oldPassword" className={styles.infoLabel}>Mật khẩu hiện tại:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            className={styles.infoValue}
                            placeholder="Mật khẩu hiện tại"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="newPassword" className={styles.infoLabel}>Mật khẩu mới:</label>
                        <input
                            type="password"
                            name="newPassword"
                            className={styles.infoValue}
                            placeholder="Mật khẩu mới"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="confirmPassword" className={styles.infoLabel}>Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            className={styles.infoValue}
                            placeholder="Xác nhận mật khẩu"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Hoàn tất</button>
                </form>
            </div>
        </section>
    );
}