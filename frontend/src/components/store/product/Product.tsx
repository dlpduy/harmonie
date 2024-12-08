import { message } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useState } from 'react';
import { ModalCreate } from './modal/ModalCreateProduct';
const products = [
    {
        id: 1,
        name: 'IP 16 promax',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/628847716364a6384e7dbbdc2a500eda53f38cccdb3cfe29a83253f5b6ac5407?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea',
        description: 'Sản phẩm mới ra mắt của Apple với dung lượng ....',
        price: '30.000.000',
        quantity: 10,
    },
    {
        id: 2,
        name: 'Apilewitch',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bf18860965edd3f3bff690d816f70641ff2a5a45220988651736285a78aafa28?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea',
        description: 'Vừa đeo vừa tập gym kêu tít tít ....',
        price: '10.999.000',
        quantity: 15,
    },
    {
        id: 3,
        name: 'Dio Sauvage',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cabaa6a09cc5e2b4beb11023a550103d14ff37f3d10cea17d8eb4c4d648630b7?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea',
        description: 'Với hương thơm nam tính quyến rũ...',
        price: '2.999.000',
        quantity: 30,
    },
];

export const Product = () => {

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    return (
        <>
            <section className={styles.mainSection}>
                <div className={styles.infoCard}>
                    <div className={styles.Header}>
                        <h2
                            className={styles.Title}
                            style={{
                                position: 'relative',
                                left: '-80%'
                            }}
                        >Sản phẩm</h2>
                        <button
                            className={styles.addButton}
                            style={{
                                position: 'relative',
                                left: '80%'
                            }}
                            onClick={() => showModalCreate()}
                        >Thêm sản phẩm</button>

                    </div>
                    <table className={styles.Table}>
                        <thead className={styles.TableHeader}>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Hình ảnh</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody className={styles.TableBody}>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        <img src={product.image} alt={product.name} className={styles.productImage} />
                                    </td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                                        <button className={`${styles.actionButton} ${styles.deleteButton}`}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <ModalCreate
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}

            />


        </>
    );
}