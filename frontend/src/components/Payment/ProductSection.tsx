import React, { useState } from 'react';
import styles from './ProductSection.module.css';
import PaymentMethodSection from './PaymentMethodSection';
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  productURL: string;
  storeID: number;
  storeName: string;
}

interface ProductSectionProps {
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<{ [productID: number]: number | null }>({});
  const [activeProductID, setActiveProductID] = useState<number | null>(null);

  const shippingCost = 15000;
  const voucherDiscount = 0;

  const vouchers = [
    { id: 1, name: 'Voucher Giảm 10k', discount: 10000 },
    { id: 2, name: 'Voucher Giảm 20k', discount: 20000 },
    { id: 3, name: 'Voucher Giảm 30k', discount: 30000 },
  ];

  if (!products || products.length === 0) {
    return <div>Không có sản phẩm trong giỏ hàng.</div>;
  }

  const groupedProducts = (products || []).reduce((acc: { [key: string]: Product[] }, product) => {
    const storeID = product.storeID ?? '0';
    if (!acc[storeID]) acc[storeID] = [];
    acc[storeID].push(product);
    return acc;
  }, {});

  const totalCost = Object.keys(groupedProducts).reduce((acc, storeID) => {
    const storeProducts = groupedProducts[storeID];
    const storeTotalCost = storeProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const storeFinalCost = storeTotalCost - storeProducts.reduce((acc, product) => acc + (selectedVouchers[product.id] ?? voucherDiscount), 0);
    return acc + storeFinalCost + shippingCost;
  }, 0);

  const toggleModal = (productID: number) => {
    if (productID !== null) {
      setActiveProductID(productID);
      setIsModalOpen(prev => !prev);
    }
  };

  const handleVoucherSelect = (voucherDiscount: number) => {
    if (activeProductID !== null) {
      setSelectedVouchers(prev => ({ ...prev, [activeProductID]: voucherDiscount }));
      toggleModal(activeProductID);
    }
  };

  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>Sản Phẩm</h2>

      {Object.keys(groupedProducts).map((storeID) => {
        const storeProducts = groupedProducts[storeID];
        const storeTotalCost = storeProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
        const storeFinalCost = storeTotalCost - storeProducts.reduce((acc, product) => acc + (selectedVouchers[product.id] ?? voucherDiscount), 0);

        return (
          <div key={storeID} className={styles.storeContainer}>
            <h3>{storeProducts[0].storeName}</h3>

            {storeProducts.map((product) => {
              const productTotal = product.price * product.quantity;

              return (
                <div key={product.id} className={styles.productContainer}>
                  <div className={styles.productRow}>
                    <div className={styles.productInfo}>
                      <img src={product.productURL} alt={product.name} className={styles.productImage} />
                      <div className={styles.productDetails}>
                        <h3 className={styles.productName}>{product.name}</h3>
                      </div>
                    </div>
                    <div className={styles.productPricing}>
                      <span>{product.price.toLocaleString()} VND</span>
                      <span>x {product.quantity}</span>
                      <span className={styles.productTotal}>{productTotal.toLocaleString()} VND</span>
                    </div>
                  </div>

                  <div className={styles.voucherRow}>
                    <span>Voucher của Sản phẩm</span>
                    <button className={styles.voucherButton} onClick={() => toggleModal(product.id)}>Chọn Voucher Khác</button>
                    <span className={styles.voucherDiscount}>
                      -{(selectedVouchers[product.id] ?? voucherDiscount).toLocaleString()} VND
                    </span>
                  </div>

                  <div className={styles.totalRow}>
                    <span className={styles.totalText}>Tổng số tiền:</span>
                    <span className={styles.totalAmount}>{productTotal.toLocaleString()} VND</span>
                  </div>
                </div>
              );
            })}

            <div className={styles.shippingRow}>
              <span>Phí vận chuyển</span>
              <span>{shippingCost.toLocaleString()} VND</span>
            </div>

            <div className={styles.totalCostRow}>
              <span className={styles.totalCostText}>Tổng chi phí cửa hàng {storeProducts[0].storeName}:</span>
              <span className={styles.totalCostAmount}>
                {storeFinalCost.toLocaleString()} VND
              </span>
            </div>
          </div>
        );
      })}
      <PaymentMethodSection />
      <div className={styles.totalCostRow}>
        <span className={styles.totalCostText}>Tổng chi phí giỏ hàng:</span>
        <span className={styles.totalCostAmount}>{totalCost.toLocaleString()} VND</span>
      
      </div>
<button className={styles.paymentButton} onClick={() => alert('Thanh toán thành công!')}>Thanh toán</button>
      {isModalOpen && activeProductID !== null && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chọn Voucher</h3>
            <div className={styles.voucherOptions}>
              {vouchers.map(voucher => (
                <button
                  key={voucher.id}
                  className={`${styles.voucherOption} ${selectedVouchers[activeProductID] === voucher.discount ? styles.selectedVoucher : ''}`}
                  onClick={() => handleVoucherSelect(voucher.discount)}
                >
                  {voucher.name} - Giảm {voucher.discount.toLocaleString()} VND
                </button>
              ))}
            </div>
            <button className={styles.closeButton} onClick={() => toggleModal(activeProductID!)}>Đóng</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;