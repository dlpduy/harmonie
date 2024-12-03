import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ShoppingCart.module.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
    storeID: number;
}

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: 'Dầu gội The Original Hair Shampoo',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b5b1dc11ace265e82cba697b6945861f502226766f239a22091c596707b1afe?apiKey=1030477bbfe341728a648dc69cf63b1d&',
        price: 299000,
        quantity: 1,
        storeID: 1,
    },
    {
        id: 2,
        name: 'Dầu gội The Original Hair Shampoo',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b5b1dc11ace265e82cba697b6945861f502226766f239a22091c596707b1afe?apiKey=1030477bbfe341728a648dc69cf63b1d&',
        price: 299000,
        quantity: 2,
        storeID: 2,
    },
];

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigate = useNavigate();


    const handleCheckboxChange = (id: number) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter(item => item !== id)
                : [...prevSelectedItems, id]
        );
    };
    const handleDelete = (id: number) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
        setSelectedItems(prevSelectedItems => prevSelectedItems.filter(item => item !== id));
    };
    const handleCheckout = () => {
        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
        navigate('/payment', { state: { selectedProducts } });
    };

    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));

    // Tính tổng tiền của các sản phẩm được chọn
    const totalAmount = useMemo(() => {
        return selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [selectedCartItems]);

    // Tính tổng tiền sau khi áp dụng voucher và phí vận chuyển
    const finalTotal = useMemo(() => {
        return totalAmount;
    }, [totalAmount]);

    return (
        <div className={styles.shoppingCart}>
            <h1 className={styles.sectionTitle}>Giỏ Hàng</h1>
            <div className={styles.productSection}>
                {cartItems.map(item => (
                    <div key={item.id} className={styles.productContainer}>
                        <div className={styles.productRow}>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                className={styles.productCheckbox}
                            />
                            <div className={styles.productInfo}>
                                <img src={item.image} alt={item.name} className={styles.productImage} />
                                <div className={styles.productDetails}>
                                    <p className={styles.productName}>{item.name}</p>
                                    {item.variant && <p className={styles.productVariant}>{item.variant}</p>}
                                </div>
                            </div>
                            <div className={styles.productPricing}>
                                <p>{item.price.toLocaleString()} VNĐ</p>
                                <p>{item.quantity}</p>
                                <p>{(item.price * item.quantity).toLocaleString()} VNĐ</p>
                            </div>
                            <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.container}>
                <div >
                    <h4 className={styles.finalTotal}>Tổng thanh toán: <span>{finalTotal.toLocaleString()} VNĐ</span></h4>
                </div>
                <button
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                >
                    ĐẶT HÀNG
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;
