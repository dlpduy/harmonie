import React, { useState } from 'react';
import styles from './ProductSection.module.css';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  storeID: number;
}

interface ProductSectionProps {
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Quản lý trạng thái modal
  const [selectedVouchers, setSelectedVouchers] = useState<{ [productID: number]: number | null }>({});  // Lưu voucher của từng sản phẩm
  const [activeProductID, setActiveProductID] = useState<number | null>(null);  // Sản phẩm đang chọn voucher

  const shippingCost = 15000; // Chi phí vận chuyển mặc định
  const voucherDiscount = 0; // Giảm giá từ voucher mặc định

  const vouchers = [ // Danh sách voucher
    { id: 1, name: 'Voucher Giảm 10k', discount: 10000 },
    { id: 2, name: 'Voucher Giảm 20k', discount: 20000 },
    { id: 3, name: 'Voucher Giảm 30k', discount: 30000 },
  ];

  // Kiểm tra nếu không có sản phẩm
  if (!products || products.length === 0) {
    return <div>Không có sản phẩm trong giỏ hàng.</div>;
  }

  // Nhóm sản phẩm theo storeID
  const groupedProducts = products.reduce((acc: { [key: number]: Product[] }, product) => {
    const storeID = product.storeID ?? 0; // Dùng storeID mặc định là 0 nếu không có
    if (!acc[storeID]) acc[storeID] = [];
    acc[storeID].push(product);
    return acc;
  }, {});

  // Tính tổng chi phí của tất cả sản phẩm trước khi áp dụng phí vận chuyển và voucher


  // Tính tổng chi phí giỏ hàng sau khi áp dụng phí vận chuyển và voucher
  const totalCost = Object.keys(groupedProducts).reduce((acc, storeID) => {
    const storeProducts = groupedProducts[Number(storeID)];
    const storeTotalCost = storeProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const storeFinalCost = storeTotalCost - storeProducts.reduce((acc, product) => acc + (selectedVouchers[product.id] ?? voucherDiscount), 0);
    return acc + storeFinalCost + shippingCost;
  }, 0);

  // Hàm mở/đóng modal
  const toggleModal = (productID: number) => {
    if (productID !== null) {
      setActiveProductID(productID);  // Lưu sản phẩm đang chọn để mở modal cho sản phẩm đó
      setIsModalOpen(prev => !prev);
    }
  };

  // Hàm chọn voucher cho từng sản phẩm
  const handleVoucherSelect = (voucherDiscount: number) => {
    if (activeProductID !== null) {
      setSelectedVouchers(prev => ({ ...prev, [activeProductID]: voucherDiscount }));
      toggleModal(activeProductID);  // Đóng modal sau khi chọn voucher
    }
  };

  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>Sản Phẩm</h2>

      {/* Hiển thị từng nhóm cửa hàng */}
      {Object.keys(groupedProducts).map((storeID) => {
        const storeProducts = groupedProducts[Number(storeID)];

        // Tính tổng chi phí cho cửa hàng
        const storeTotalCost = storeProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

        // Tổng chi phí cửa hàng sau khi áp dụng voucher và phí vận chuyển
        const storeFinalCost = storeTotalCost - storeProducts.reduce((acc, product) => acc + (selectedVouchers[product.id] ?? voucherDiscount), 0);

        return (
          <div key={storeID} className={styles.storeContainer}>
            <h3>Cửa hàng {storeID}</h3>

            {/* Hiển thị từng sản phẩm trong cửa hàng */}
            {storeProducts.map((product) => {
              const productTotal = product.price * product.quantity; // Thành tiền của sản phẩm

              return (
                <div key={product.id} className={styles.productContainer}>
                  {/* Hàng sản phẩm */}
                  <div className={styles.productRow}>
                    <div className={styles.productInfo}>
                      <img src={product.image} alt={product.name} className={styles.productImage} />
                      <div className={styles.productDetails}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        {product.variant && <p className={styles.productVariant}>{product.variant}</p>}
                      </div>
                    </div>
                    <div className={styles.productPricing}>
                      <span>{product.price.toLocaleString()} VND</span>
                      <span>x {product.quantity}</span>
                      <span className={styles.productTotal}>{productTotal.toLocaleString()} VND</span>
                    </div>
                  </div>

                  {/* Hàng voucher */}
                  <div className={styles.voucherRow}>
                    <span>Voucher của Sản phẩm</span>
                    <button className={styles.voucherButton} onClick={() => toggleModal(product.id)}>Chọn Voucher Khác</button>
                    <span className={styles.voucherDiscount}>
                      -{(selectedVouchers[product.id] ?? voucherDiscount).toLocaleString()} VND
                    </span>
                  </div>

                  {/* Hàng tổng tiền cho sản phẩm */}
                  <div className={styles.totalRow}>
                    <span className={styles.totalText}>Tổng số tiền:</span>
                    <span className={styles.totalAmount}>{productTotal.toLocaleString()} VND</span>
                  </div>
                </div>
              );
            })}

            {/* Hiển thị phí vận chuyển ở trên tổng chi phí cửa hàng */}
            <div className={styles.shippingRow}>
              <span>Phí vận chuyển</span>
              <span>{shippingCost.toLocaleString()} VND</span>
            </div>

            {/* Hàng tổng chi phí của cửa hàng */}
            <div className={styles.totalCostRow}>
              <span className={styles.totalCostText}>Tổng chi phí cửa hàng {storeID}:</span>
              <span className={styles.totalCostAmount}>
                {storeFinalCost.toLocaleString()} VND
              </span>
            </div>
          </div>
        );
      })}

      {/* Hàng tổng chi phí giỏ hàng */}
      <div className={styles.totalCostRow}>
        <span className={styles.totalCostText}>Tổng chi phí giỏ hàng:</span>
        <span className={styles.totalCostAmount}>{totalCost.toLocaleString()} VND</span>
      </div>

      {/* Modal chọn voucher */}
      {isModalOpen && activeProductID !== null && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chọn Voucher</h3>
            <div className={styles.voucherOptions}>
              {vouchers.map(voucher => (
                <button
                  key={voucher.id}
                  className={`${styles.voucherOption} ${selectedVouchers[activeProductID] === voucher.discount ? styles.selectedVoucher : ''}`}
                  onClick={() => handleVoucherSelect(voucher.discount)}  // Chọn voucher cho sản phẩm hiện tại
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
