import React, { useState, useEffect } from 'react';
import styles from './AddressSection.module.css';

interface Address {
  userPhone: string;
  road_number: string;
  ward: string;
  district: string;
  city: string;
}

interface AddressSectionProps {
  userName: string;
  address: Address[];
}

const AddressSection: React.FC = () => {
  const [data, setData] = useState<AddressSectionProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    // Giả sử API trả về dữ liệu theo cấu trúc bạn đã cung cấp
    fetch('https://f41ad901-d7aa-423c-88ff-b02678679bb6.mock.pstmn.io/address') // Thay đổi URL này theo API thực tế của bạn
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setSelectedAddress(result.data.address[0]); // Hiển thị địa chỉ đầu tiên
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(false); // Đóng modal sau khi chọn địa chỉ
  };

  if (!data || !selectedAddress) {
    return <div>Loading...</div>;
  }

  const addressText = `${selectedAddress.road_number}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.city}`;

  return (
    <section className={styles.addressSection}>
      <h2 className={styles.sectionTitle}>Địa chỉ nhận hàng</h2>
      <div className={styles.addressInfo}>
        <div className={styles.userDetails}>
          <p className={styles.userName}>{data.userName}</p>
        </div>
        <div className={styles.addressDetails}>
          <p className={styles.userPhone}>{selectedAddress.userPhone}</p>
          <p className={styles.addressText}>{addressText}</p>
          <button className={styles.changeButton} onClick={handleChangeClick}>Thay đổi</button>
        </div>
      </div>

       {/* Modal */}
       {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chọn địa chỉ để thay đổi</h3>
            {data.address.map((address, index) => (
              <button 
                key={index} 
                className={styles.addressOptionButton} 
                onClick={() => handleSelectAddress(address)}
              >
                {`${address.road_number}, ${address.ward}, ${address.district}, ${address.city}`}
              </button>
            ))}
            <button onClick={handleModalClose}>Đóng</button>
          </div>
        </div>
      )}  
    </section>
  );
};

export default AddressSection;
