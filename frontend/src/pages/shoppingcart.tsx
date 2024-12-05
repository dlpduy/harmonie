import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ShoppingCart.module.css';

interface CartItem {
    id: number;
    name: string;
    brand: string;
    catogoryName: string;
    price: number;
    quantity: number;
    productURL: string;
    storeID: number;
    storeName: string;
}

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('https://d6e8b34e-4542-4f45-a933-74baa1d4d783.mock.pstmn.io/productincart');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCartItems(data.data);
            } catch (error) {
                setError('Error fetching cart items. Please try again later.');
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

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

    if (error) {
        return <div>{error}</div>;
    }

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
                                <img src={item.productURL} alt={item.name} className={styles.productImage} />
                                <div className={styles.productDetails}>
                                    <p className={styles.productName}>{item.name}</p>
                                    <p className={styles.productBrand}>{item.brand}</p>
                                    <p className={styles.productCategory}>{item.catogoryName}</p>
                                    <p className={styles.storeName}>{item.storeName}</p>
                                    
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
                <div>
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